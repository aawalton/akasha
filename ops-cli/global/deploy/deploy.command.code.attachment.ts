export const summary = "Put one named service into production from its own synth"

import {
  clusterService,
  deploy,
  planFor,
  relativeTo,
} from "../../../deploy-system/deploy/deploy.ts"
import { DeployRefused } from "../../../deploy-system/refusal/refusal.ts"
import { everyService, serviceNamed } from "../../../deploy-system/service/service.ts"
import { fail } from "../../../patches/patch.ts"
import { akashaRoot } from "../../../repo/roots/roots.ts"
import { rejectUnknownFlags } from "../address.ts"

const LIST = "--list"

const DRY_RUN = "--dry-run"

const VALUE_FLAGS: readonly string[] = []

const BARE_FLAGS = [LIST, DRY_RUN, "--help", "-h"]

function namedIn(argv: readonly string[]): readonly string[] {
  return argv.filter((one) => !one.startsWith("-"))
}

function listEvery(root: string): void {
  const every = [...everyService(root)].sort((one, other) => one.slug.localeCompare(other.slug))
  for (const one of every) {
    const where = one.where === "cluster" ? `${one.namespace}/${one.resourceName}` : "workstation"
    process.stdout.write(`${one.slug.padEnd(34)}${where}\n`)
  }
  process.stdout.write(`\n${every.length} service(s) have a page\n`)
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
    "THIS IS NOT `ops service`, which starts and stops the systemd units of a workstation " +
    "service. A workstation service is refused here.",
  irreversible: "irreversible" as const,
  flags: [
    { name: LIST, description: "Name every service that has a page, and say where each runs." },
    { name: DRY_RUN, description: "Report the synth, the manifests and the order; apply nothing." },
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

  const service = clusterService(serviceNamed(root, named[0] as string))

  if (argv.includes(DRY_RUN)) {
    const plan = await planFor(root, service)
    process.stdout.write(`${service.slug} is emitted by ${relativeTo(root, plan.synthPath)}\n`)
    for (const manifest of plan.manifests) {
      process.stdout.write(`  ${relativeTo(root, manifest.path)}\n`)
    }
    return
  }

  const done = await deploy(root, service)
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
}

if (import.meta.main) {
  const own = process.argv.slice(2)
  if (own.includes("--help") || own.includes("-h")) {
    process.stdout.write(
      "This is the deploy command's own entry point, for a caller that would pay to load every " +
        "other command through `ops`. Its help is `ops deploy --help`.\n"
    )
  } else {
    await deployCommand(own)
  }
}
