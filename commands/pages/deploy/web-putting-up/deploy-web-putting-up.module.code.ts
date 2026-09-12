import { join } from "node:path"
import {
  DATA,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredWith, refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { pushBranch } from "akasha/git/pushing/git-pushing.module.code.ts"
import {
  alreadyBuilt,
  buildInPod,
  buildTargetOf,
  carriedByOrigin,
  declaredBuildEnv,
  inPod,
  installableAt,
  livePod,
  type Resolved,
  resolveBuildEnv,
} from "akasha/infrastructure/services/clusters/web-app-building/web-app-building.module.code.ts"
import { deployableNamed } from "akasha/infrastructure/services/clusters/web-app-reading/web-app-reading.module.code.ts"
import {
  appliedOf,
  planFor,
  putUp,
  unfilledOf,
  upAlready,
  writeManifests,
} from "akasha/infrastructure/services/clusters/workload-deploying/workload-deploying.module.code.ts"

const SAID = 4

export async function putUpWebApp(
  slug: string,
  sha: string,
  given: Given,
  dryRun: boolean,
  codeAt: string,
  up: string[] = []
): Promise<Answer> {
  const read = deployableNamed(given.root, slug)
  if ("refused" in read) return refused(read.refused, DATA)
  const deployable = read.deployable
  const workload = deployable.workload

  const report: string[] = [
    `web-app\t${deployable.slug}\t${deployable.pagePath}`,
    `service-cluster\t${deployable.serviceClusterSlug}\t${deployable.servicePath}`,
    `workload\t${workload.kind} ${workload.namespace}/${workload.name}`,
    `code\t${deployable.synthPath}`,
  ]

  const plan = await planFor(codeAt, workload, deployable.synthPath)
  if (typeof plan === "string") return answeredWith(report, [plan], DATA)

  const left = unfilledOf(plan)
  if (left.length > 0) {
    return answeredWith(
      report,
      left.map((one) => `${one}, and applying it would write the stand-in itself into the cluster`),
      DATA
    )
  }

  const carried = carriedByOrigin(given.root, sha)
  if ("why" in carried) return answeredWith(report, [carried.why], OPERATIONAL)
  report.push(
    `source\t${sha}\t${carried.carried ? "origin carries it" : "origin does not carry it"}`
  )
  if (!carried.carried && dryRun) {
    report.push(`push\t${sha} would be pushed to origin, and a dry run pushes nothing`)
  }
  if (!carried.carried && !dryRun) {
    const pushed = pushBranch(given.root)
    report.push(`push\t${pushed.line}`)
    if (pushed.failed) {
      return answeredWith(
        report,
        [
          `origin main does not carry ${sha}, and a pod serves what origin carries, so this web app cannot be put up until that push lands`,
        ],
        OPERATIONAL
      )
    }
    up.push(`${sha}, pushed to origin main`)
    const now = carriedByOrigin(given.root, sha)
    if ("why" in now) return answeredWith(report, [now.why], OPERATIONAL)
    if (!now.carried) {
      return answeredWith(
        report,
        [`origin main does not carry ${sha} even after the push, so this web app cannot be put up`],
        OPERATIONAL
      )
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
    report.push(`serving\t${target.packagePath}\tfrom ${from}`)
  }

  let resolved: Resolved = { env: [], hidden: [], missing: [] }
  if (target !== null && !isBuilt) {
    const installs = installableAt(given.root, sha)
    if ("why" in installs) return answeredWith(report, [installs.why], DATA)
    report.push(`installs\t${sha}\tthe manifests it tracks`)
    const declared = await declaredBuildEnv(join(codeAt, deployable.synthPath))
    resolved = resolveBuildEnv(target.namespace, declared, sha)
    report.push(`build-env\t${resolved.env.map((one) => one.name).join(" ")}`)
    if (resolved.missing.length > 0) {
      return answeredWith(
        report,
        resolved.missing.map(
          (one) => `${one}, so the build would inline nothing where a value belongs`
        ),
        DATA
      )
    }
  }

  let differs = false
  for (const manifest of plan.manifests) {
    const applied = appliedOf(plan, manifest)
    if ("why" in applied) return answeredWith(report, [applied.why], OPERATIONAL)
    report.push(`manifest\t${manifest.path}\t${applied.stands ? "stands" : "differs"}`)
    if (!applied.stands) differs = true
  }
  const alreadyUp = upAlready(workload)
  report.push(`standing\t${alreadyUp ? "up" : "not up"}`)

  if (!differs && alreadyUp && isBuilt) {
    report.push(
      `nothing\tthe cluster already stands as ${deployable.slug}'s page describes, at ${sha}`
    )
    return told(report)
  }

  if (dryRun) {
    report.push("dry-run\tnothing was applied; run it again without `--dry-run` to carry it out")
    return told(report)
  }

  let builtNow = false
  if (target !== null && !isBuilt) {
    const built = buildInPod(target, sha, resolved, !differs && alreadyUp)
    for (const one of built.ran) {
      report.push(`ran\t${one.argv.slice(0, SAID).join(" ")}\texited ${one.code}`)
    }
    if (built.why !== null) return answeredWith(report, [built.why], OPERATIONAL)
    builtNow = true
    up.push(`${target.packagePath}, built in the pod from ${sha}`)
  }

  if (differs || !alreadyUp) {
    for (const one of writeManifests(given.root, plan)) report.push(`wrote\t${one}`)
    const refusals: string[] = []
    for (const one of putUp(plan)) {
      report.push(`kubectl\t${one.argv.join(" ")}\t${one.stdout.trim().split("\n").join("; ")}`)
      if (one.code !== 0) {
        refusals.push(`kubectl ${one.argv.join(" ")} exited ${one.code}: ${one.stderr.trim()}`)
      }
    }
    if (refusals.length > 0) return answeredWith(report, refusals, OPERATIONAL)
    up.push(`${workload.kind} ${workload.namespace}/${workload.name}, applied to the cluster`)
  }

  if (target !== null && builtNow) {
    const serving = livePod(target)
    report.push(
      serving === null
        ? `built\t${target.packagePath}\tfrom ${sha}, and no pod the cluster calls running has it`
        : `built\t${target.packagePath}\tin ${serving} from ${sha}`
    )
  }

  report.push(
    `up\t${workload.kind} ${workload.namespace}/${workload.name} stands as its page describes`
  )
  return told(report)
}
