import { join } from "node:path"
import {
  alreadyBuilt,
  buildInPod,
  buildTargetOf,
  carriedByOrigin,
  declaredBuildEnv,
  headOf,
  inPod,
  installableAt,
  livePod,
  type Resolved,
  resolveBuildEnv,
} from "@akasha/service-system/web-app-building"
import { deployableNamed } from "@akasha/service-system/web-app-reading"
import {
  appliedOf,
  planFor,
  putUp,
  unfilledOf,
  upAlready,
  writeManifests,
} from "@akasha/service-system/workload-deploying"
import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"
import { refused } from "../../../command-system/calling/calling.module.code.ts"

const DATA = 2
const OPERATIONAL = 3
const SAID = 4

export async function putUpWebApp(slug: string, given: Given, dryRun: boolean): Promise<Answer> {
  const read = deployableNamed(given.root, slug)
  if ("refused" in read) return refused(read.refused, DATA)
  const deployable = read.deployable
  const workload = deployable.workload

  const report: string[] = [
    `web-app\t${deployable.slug}\t${deployable.pagePath}`,
    `cluster-service\t${deployable.clusterServiceSlug}\t${deployable.servicePath}`,
    `workload\t${workload.kind} ${workload.namespace}/${workload.name}`,
    `code\t${deployable.synthPath}`,
  ]

  const plan = await planFor(given.root, workload, deployable.synthPath)
  if (typeof plan === "string") return { report, refusals: [plan], code: DATA }

  const left = unfilledOf(plan)
  if (left.length > 0) {
    return {
      report,
      refusals: left.map(
        (one) => `${one}, and applying it would write the stand-in itself into the cluster`
      ),
      code: DATA,
    }
  }

  const sha = headOf(given.root)
  if (sha === null) {
    return {
      report,
      refusals: [
        `git says no commit stands at HEAD under ${given.root}, so nothing names the source to build`,
      ],
      code: DATA,
    }
  }
  const carried = carriedByOrigin(given.root, sha)
  if ("why" in carried) return { report, refusals: [carried.why], code: OPERATIONAL }
  report.push(
    `source\t${sha}\t${carried.carried ? "origin carries it" : "origin does not carry it"}`
  )
  if (!carried.carried) {
    return {
      report,
      refusals: [
        // MIGRATION ONLY, added 2026-09-03. This remedy used to read
        // "so run `git push origin ${sha}:main` and deploy again", and an agent followed it:
        // five rounds of push-then-deploy carried 5,848 commits to origin against
        // akasha-migration constraint 16. Put the old remedy back when the migration is done.
        `origin main does not carry ${sha}, and a pod serves what origin carries, so this web app cannot be put up. The akasha migration forbids pushing to the remote — its sixteenth constraint is that commits stay local — so the push that would close this gap is refused too. Nothing is broken and there is nothing to work around: report the deploy you could not make and carry on.`,
      ],
      code: OPERATIONAL,
    }
  }

  const target = buildTargetOf(plan)
  const pod = target === null ? null : livePod(target)
  const held = target === null || pod === null ? null : inPod(target, pod)
  const isBuilt = target === null || alreadyBuilt(held, sha)
  if (target === null) {
    report.push(
      `build\tno container syncs code into ${workload.name}, so its build is made somewhere else`
    )
  } else {
    const from = held === null ? "no pod says" : held.builtFrom === "" ? "nothing" : held.builtFrom
    report.push(`build\t${target.packagePath}\tfrom ${from}`)
  }

  let resolved: Resolved = { env: [], hidden: [], missing: [] }
  if (target !== null && !isBuilt) {
    const installs = installableAt(given.root, sha)
    if ("why" in installs) return { report, refusals: [installs.why], code: DATA }
    report.push(`installs\t${sha}\tthe manifests it tracks`)
    const declared = await declaredBuildEnv(join(given.root, deployable.synthPath))
    resolved = resolveBuildEnv(target.namespace, declared, sha)
    report.push(`build-env\t${resolved.env.map((one) => one.name).join(" ")}`)
    if (resolved.missing.length > 0) {
      return {
        report,
        refusals: resolved.missing.map(
          (one) => `${one}, so the build would inline nothing where a value belongs`
        ),
        code: DATA,
      }
    }
  }

  let differs = false
  for (const manifest of plan.manifests) {
    const applied = appliedOf(manifest)
    if ("why" in applied) return { report, refusals: [applied.why], code: OPERATIONAL }
    report.push(`manifest\t${manifest.path}\t${applied.stands ? "stands" : "differs"}`)
    if (!applied.stands) differs = true
  }
  const up = upAlready(workload)
  report.push(`standing\t${up ? "up" : "not up"}`)

  if (!differs && up && isBuilt) {
    report.push(
      `nothing\tthe cluster already stands as ${deployable.slug}'s page describes, at ${sha}`
    )
    return { report, refusals: [], code: 0 }
  }

  if (dryRun) {
    report.push("dry-run\tnothing was applied; run it again without `--dry-run` to carry it out")
    return { report, refusals: [], code: 0 }
  }

  if (differs || !up) {
    for (const one of writeManifests(given.root, plan)) report.push(`wrote\t${one}`)
    const refusals: string[] = []
    for (const one of putUp(plan)) {
      report.push(`kubectl\t${one.argv.join(" ")}\t${one.stdout.trim().split("\n").join("; ")}`)
      if (one.code !== 0) {
        refusals.push(`kubectl ${one.argv.join(" ")} exited ${one.code}: ${one.stderr.trim()}`)
      }
    }
    if (refusals.length > 0) return { report, refusals, code: OPERATIONAL }
  }

  if (target !== null && !isBuilt) {
    const built = buildInPod(target, sha, resolved)
    for (const one of built.ran) {
      report.push(`ran\t${one.argv.slice(0, SAID).join(" ")}\texited ${one.code}`)
    }
    if (built.why !== null) return { report, refusals: [built.why], code: OPERATIONAL }
    report.push(`built\t${target.packagePath}\tin ${built.pod} from ${sha}`)
  }

  report.push(
    `up\t${workload.kind} ${workload.namespace}/${workload.name} stands as its page describes`
  )
  return { report, refusals: [], code: 0 }
}
