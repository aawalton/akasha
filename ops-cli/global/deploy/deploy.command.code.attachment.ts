export const summary = "Put one named service into production from its own synth"

import {
  clusterService,
  deploy,
  type Plan,
  planFor,
  refuseStandIns,
  relativeTo,
} from "../../../deploy-system/deploy/deploy.ts"
import {
  appliedAt,
  forgetGone,
  markFor,
  recordApplied,
} from "../../../deploy-system/closure/closure.ts"
import {
  alreadyBuilt,
  buildInPlace,
  buildTargetOf,
  declaredBuildEnv,
  headSha,
  livePod,
  resolveBuildEnv,
  standingIn,
} from "../../../deploy-system/build/build.ts"
import { publishLiveVersion } from "../../../deploy-system/live-version/live-version.ts"
import { DeployRefused } from "../../../deploy-system/refusal/refusal.ts"
import {
  keyOf,
  kindsOf,
  runningOf,
  unpaged,
  workloadOf,
} from "../../../deploy-system/running/running.ts"
import type { ClusterService } from "../../../deploy-system/service/service.ts"
import { everyService, serviceNamed } from "../../../deploy-system/service/service.ts"
import { fail } from "../../../patches/patch.ts"
import { akashaRoot } from "../../../repo/roots/roots.ts"
import { answerPageQueriesInProcess } from "../../../tools/ops/page-queries-in-process.ts"
import { rejectUnknownFlags } from "../address.ts"

const LIST = "--list"

const DRY_RUN = "--dry-run"

const AGAIN = "--again"

const VALUE_FLAGS: readonly string[] = []

const BARE_FLAGS = [LIST, DRY_RUN, AGAIN, "--help", "-h"]

function namedIn(argv: readonly string[]): readonly string[] {
  return argv.filter((one) => !one.startsWith("-"))
}

function isRunning(service: ClusterService): boolean {
  const found = runningOf([service.resourceKind])
  if (!found.reached) return false
  return new Set(found.workloads.map(keyOf)).has(keyOf(workloadOf(service)))
}

function heldBack(akasha: string, plan: Plan, mark: string): string | null {
  const applied = appliedAt(akasha, plan.service.slug, mark)
  if (applied === null) return null
  if (!isRunning(plan.service)) return null
  const target = buildTargetOf(plan)
  if (target !== null) {
    const pod = livePod(target)
    if (pod === null) return null
    const standing = standingIn(target, pod)
    if (standing === null || !alreadyBuilt(standing, headSha(akasha))) return null
  }
  return (
    `${plan.service.slug} was deployed from exactly these manifests at ${applied.when}, and the ` +
    `cluster is running it, so there is nothing to apply\n` +
    `\`ops deploy ${AGAIN} ${plan.service.slug}\` applies them regardless\n`
  )
}

function listEvery(root: string): void {
  const every = [...everyService(root)].sort((one, other) => one.slug.localeCompare(other.slug))
  const cluster = every.filter((one): one is ClusterService => one.where === "cluster")
  const found = runningOf(kindsOf(cluster))
  const running = found.reached ? new Set(found.workloads.map(keyOf)) : null

  for (const one of every) {
    if (one.where !== "cluster") {
      process.stdout.write(`${one.slug.padEnd(34)}workstation\n`)
      continue
    }
    const where = `${one.namespace}/${one.resourceName}`
    const state =
      running === null ? "" : running.has(keyOf(workloadOf(one))) ? "running" : "NOT RUNNING"
    process.stdout.write(`${one.slug.padEnd(34)}${where.padEnd(42)}${state}\n`)
  }
  process.stdout.write(`\n${every.length} service(s) have a page\n`)

  if (!found.reached) {
    process.stderr.write(
      `the cluster was not reached, so nothing above says which of these is running: ${found.why}\n`
    )
    return
  }

  const left = unpaged(found.workloads, cluster)
  if (left.length === 0) {
    process.stdout.write("every workload the cluster runs has a page\n")
    return
  }
  process.stdout.write(`\n${left.length} workload(s) the cluster runs have no page:\n`)
  for (const one of left) {
    process.stdout.write(`  ${one.kind} ${one.namespace}/${one.name}\n`)
  }
}

export const help = {
  description:
    `${summary}.\n` +
    "\n" +
    "ONE SERVICE, NAMED BY ITS PAGE SLUG. What the deploy is made of is not on the call: the " +
    "synth that emits the service's workload is found by matching the kind, name and namespace " +
    "its page states, and everything that synth emits goes together. A service no synth emits is " +
    "REFUSED, and so is one two synths emit, rather than guessed at.\n" +
    "\n" +
    "THE ORDER IS THE DEPENDENCY ORDER: the namespace first, then the configuration and secrets " +
    "placed in it, then the workload that reads them. The manifests are written beside their own " +
    "synth.ts before anything is applied, so what reached the cluster is on disk to read back. " +
    "The apply is server-side and takes the field ownership it needs. Where the workload is a " +
    "Deployment, StatefulSet or DaemonSet, the deploy waits for its rollout rather than returning " +
    "on the apply.\n" +
    "\n" +
    "A SERVICE THAT BUILDS IN ITS POD IS BUILT AND RESTARTED HERE, and every web app that names " +
    "it is then told the commit it is live at, so a browser holding an older bundle is offered " +
    "the reload.\n" +
    "\n" +
    "WHAT WAS APPLIED IS REMEMBERED, under a mark taken over the manifests themselves rather than " +
    "over the code that emitted them, so anything a synth read without importing it still moves " +
    "the mark. A service the cluster is already running from exactly these manifests applies " +
    "nothing. A service the cluster has lost is applied whether or not its manifests moved.\n" +
    "\n" +
    "THIS IS NOT `ops service`, which starts and stops the systemd units of a workstation " +
    "service. A workstation service is refused here.",
  irreversible: "irreversible" as const,
  flags: [
    {
      name: LIST,
      description:
        "Name every service that has a page, say where each runs and whether the cluster is " +
        "running it, and name every workload it runs that no page names.",
    },
    { name: DRY_RUN, description: "Report the synth, the manifests and the order; apply nothing." },
    {
      name: AGAIN,
      description: "Apply the manifests though the cluster was last given these same ones.",
    },
  ],
  positionals: [
    {
      name: "service",
      required: true,
      variadic: false,
      description: "The slug of the service's page.",
    },
  ],
}

export default async function deployCommand(argv: readonly string[]): Promise<void> {
  try {
    await deploying(argv)
  } catch (thrown) {
    if (thrown instanceof DeployRefused) {
      process.stderr.write(`error: ${thrown.message}\n`)
      process.exit(3)
    }
    throw thrown
  }
}

async function deploying(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) return
  rejectUnknownFlags(argv, VALUE_FLAGS, BARE_FLAGS)

  const root = akashaRoot()
  if (argv.includes(LIST)) {
    listEvery(root)
    return
  }

  const named = namedIn(argv)
  if (named.length === 0) fail(`name the service to deploy; \`ops deploy ${LIST}\` names them`)
  if (named.length > 1) {
    fail(`a deploy carries one service, and ${named.length} were named: ${named.join(", ")}`)
  }

  const every = everyService(root)
  const service = clusterService(serviceNamed(root, named[0] as string))
  const plan = await planFor(root, service)
  const mark = markFor(root, plan)

  if (argv.includes(DRY_RUN)) {
    process.stdout.write(`${service.slug} is emitted by ${relativeTo(root, plan.synthPath)}\n`)
    for (const manifest of plan.manifests) {
      process.stdout.write(`  ${relativeTo(root, manifest.path)}\n`)
    }
    refuseStandIns(root, plan)
    const would = buildTargetOf(plan)
    if (would !== null) {
      process.stdout.write(
        `  and a build of ${would.packagePath} in the pod at ${headSha(root)}, then a restart\n`
      )
    }
    process.stdout.write(heldBack(root, plan, mark) ?? "these manifests would be applied\n")
    return
  }

  forgetGone(
    root,
    every.map((one) => one.slug)
  )

  if (!argv.includes(AGAIN)) {
    const held = heldBack(root, plan, mark)
    if (held !== null) {
      process.stdout.write(held)
      return
    }
  }

  const builds = buildTargetOf(plan) !== null
  const done = await deploy(root, plan, !builds)
  for (const written of done.written) {
    process.stderr.write(`wrote ${relativeTo(root, written)}\n`)
  }
  for (const ran of done.ran) {
    process.stdout.write(ran.stdout)
    process.stderr.write(ran.stderr)
    if (ran.code !== 0) {
      process.stderr.write(`error: kubectl ${ran.argv.join(" ")} exited ${ran.code}\n`)
      process.exit(3)
    }
  }
  for (const one of done.placed) {
    process.stdout.write(
      `placed ${one.name} in ${plan.service.namespace} holding ${one.keys.join(", ")}\n`
    )
  }
  for (const one of done.unplaced) {
    process.stdout.write(
      `${plan.service.slug} reads ${one.name} under ${one.key}, which no secret page places, ` +
        `so the cluster keeps whatever it already holds there\n`
    )
  }
  await buildIfItBuilds(root, plan)
  recordApplied(root, plan, mark)
}

async function buildIfItBuilds(root: string, plan: Plan): Promise<void> {
  const target = buildTargetOf(plan)
  if (target === null) return

  const sha = headSha(root)
  const declared = await declaredBuildEnv(plan.synthPath)
  const resolved = resolveBuildEnv(target.namespace, declared, sha)
  if (resolved.missing.length > 0) {
    for (const one of resolved.missing) {
      process.stderr.write(`error: ${one.entry.name} for ${plan.service.slug}: ${one.why}\n`)
    }
    process.exit(3)
  }

  const built = buildInPlace(target, sha, resolved.env)
  if (built.pod === "") {
    process.stderr.write(
      `error: no Running pod of ${target.namespace}/${target.deployment} to build in\n`
    )
    process.exit(3)
  }
  if (built.skipped) {
    process.stdout.write(`${built.pod} is already serving a build made from ${sha}\n`)
    await publish(root, plan, sha)
    return
  }
  process.stdout.write(`building ${target.packagePath} at ${sha} in ${built.pod}\n`)
  for (const ran of built.ran) {
    process.stdout.write(ran.stdout)
    process.stderr.write(ran.stderr)
    if (ran.code !== 0) {
      process.stderr.write(`error: kubectl ${ran.argv.join(" ")} exited ${ran.code}\n`)
      process.exit(3)
    }
  }
  await publish(root, plan, sha)
}

async function publish(root: string, plan: Plan, sha: string): Promise<void> {
  const published = await publishLiveVersion(root, plan.service.slug, sha)
  if (published.length === 0) {
    process.stdout.write(
      `no web app page names ${plan.service.slug}, so nothing was told it is live at ${sha}\n`
    )
    return
  }
  for (const one of published) {
    if (one.ok) {
      process.stdout.write(`${one.webApp} is live at ${sha}\n`)
      continue
    }
    process.stderr.write(`error: ${one.webApp} was not told it is live at ${sha}: ${one.why}\n`)
    process.exit(3)
  }
}

if (import.meta.main) {
  const own = process.argv.slice(2)
  if (own.includes("--help") || own.includes("-h")) {
    process.stdout.write(
      "This is the deploy command's own entry point, for a caller that would pay to load every " +
        "other command through `ops`. Its help is `ops deploy --help`.\n"
    )
  } else {
    answerPageQueriesInProcess()
    await deployCommand(own)
  }
}
