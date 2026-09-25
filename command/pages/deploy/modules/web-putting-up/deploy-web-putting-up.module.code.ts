import {
  answeredWith,
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { pushBranch } from "akasha/git/modules/pushing/git-pushing.module.code.ts"
import { heldInRegistry } from "akasha/infrastructure/container-image/modules/image-publishing/image-publishing.module.code.ts"
import { DeployRefused } from "akasha/infrastructure/service/akasha-service/secret/modules/placing/secret-placing.module.code.ts"
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
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-building/web-app-building.module.code.ts"
import {
  type ImageTarget,
  imageBuilt,
  imageRefOf,
  imageTagOf,
  imageTargetOf,
  withCommit,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-imaging/web-app-imaging.module.code.ts"
import {
  type Deployable,
  deployableNamed,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-reading/web-app-reading.module.code.ts"
import { placingBetween } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-applying/workload-applying.module.code.ts"
import {
  appliedOf,
  type Plan,
  planFor,
  planFromFile,
  putUp,
  unfilledOf,
  upAlready,
  writeManifests,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-deploying/workload-deploying.module.code.ts"

const SAID = 4

type Putting = {
  readonly deployable: Deployable
  readonly plan: Plan
  readonly sha: string
  readonly root: string
  readonly codeAt: string
  readonly alreadyUp: boolean
  readonly report: string[]
  readonly up: string[]
}

function applied(putting: Putting): readonly string[] {
  const { plan, root, alreadyUp, report, up } = putting
  const workload = putting.deployable.workload
  for (const one of writeManifests(root, plan)) report.push(`wrote\t${one}`)
  const refusals: string[] = []
  for (const one of putUp(plan, alreadyUp ? () => [] : placingBetween(root, report))) {
    report.push(`kubectl\t${one.argv.join(" ")}\t${one.stdout.trim().split("\n").join("; ")}`)
    if (one.code !== 0) {
      refusals.push(`kubectl ${one.argv.join(" ")} exited ${one.code}: ${one.stderr.trim()}`)
    }
  }
  if (refusals.length === 0) {
    up.push(`${workload.kind} ${workload.namespace}/${workload.name}, applied to the cluster`)
  }
  return refusals
}

type Differing = { readonly differs: boolean } | { readonly why: string }

function differing(plan: Plan, report: string[]): Differing {
  let differs = false
  for (const manifest of plan.manifests) {
    const matched = appliedOf(plan, manifest)
    if ("why" in matched) return matched
    report.push(`manifest\t${manifest.path}\t${matched.stands ? "stands" : "differs"}`)
    if (!matched.stands) differs = true
  }
  return { differs }
}

function nothingSaid(putting: Putting): string {
  return `nothing\tthe cluster already stands as ${putting.deployable.slug}'s page describes, at ${putting.sha}`
}

function upSaid(putting: Putting): string {
  const workload = putting.deployable.workload
  return `up\t${workload.kind} ${workload.namespace}/${workload.name} stands as its page describes`
}

type Readied = { readonly resolved: Resolved } | { readonly refused: Answer }

function readied(putting: Putting, namespace: string): Readied {
  const { sha, report } = putting
  const installs = installableAt(putting.root, sha)
  if ("why" in installs) return { refused: answeredWith(report, [installs.why], DATA) }
  report.push(`installs\t${sha}\tthe manifests it tracks`)
  const manifestPath = putting.deployable.manifestPath
  const declared = manifestPath === null ? [] : declaredBuildEnv(putting.codeAt, manifestPath)
  const resolved = resolveBuildEnv(namespace, declared, sha)
  report.push(`build-env\t${resolved.env.map((one) => one.name).join(" ")}`)
  if (resolved.missing.length === 0) return { resolved }
  const why = resolved.missing.map(
    (one) => `${one}, so the build would inline nothing where a value belongs`
  )
  return { refused: answeredWith(report, why, DATA) }
}

async function imageMade(image: ImageTarget, putting: Putting): Promise<Answer | null> {
  const { sha, report, up } = putting
  const ref = imageRefOf(image)
  const held = await heldInRegistry(image.repository, image.tag)
  report.push(`image\t${ref}\t${held ? "in the registry" : "not in the registry"}`)
  if (held) return null
  const ready = readied(putting, image.namespace)
  if ("refused" in ready) return ready.refused
  const built = imageBuilt(putting.root, image, sha, ready.resolved)
  for (const one of built.ran) {
    report.push(`ran\t${one.argv.slice(0, SAID).join(" ")}\texited ${one.code}`)
  }
  if (built.why !== null) return answeredWith(report, [built.why], OPERATIONAL)
  up.push(`${ref}, built from ${sha} and pushed to the registry`)
  return null
}

async function imagePutUp(image: ImageTarget, putting: Putting): Promise<Answer> {
  const { sha, report } = putting
  const ref = imageRefOf(image)
  if (image.tag !== imageTagOf(sha)) {
    return answeredWith(
      report,
      [
        `the manifests name ${ref}, which is not the tag of ${sha}, so the pod would run a build of another commit`,
      ],
      DATA
    )
  }
  const unmade = await imageMade(image, putting)
  if (unmade !== null) return unmade
  const matched = differing(putting.plan, report)
  if ("why" in matched) return answeredWith(report, [matched.why], OPERATIONAL)
  if (!matched.differs && putting.alreadyUp) {
    report.push(nothingSaid(putting))
    return told(report)
  }
  const refusals = applied(putting)
  if (refusals.length > 0) return answeredWith(report, refusals, OPERATIONAL)
  report.push(`serving\t${image.packagePath}\tfrom ${ref}`)
  report.push(upSaid(putting))
  return told(report)
}

async function plannedAt(
  deployable: Deployable,
  codeAt: string,
  sha: string
): Promise<Plan | string> {
  const workload = deployable.workload
  if (deployable.manifestsPath !== null) {
    return planFromFile(codeAt, workload, deployable.manifestsPath, (yaml) => withCommit(yaml, sha))
  }
  if (deployable.synthPath !== null) return await planFor(codeAt, workload, deployable.synthPath)
  return `${deployable.servicePath} states no manifests file and names no manifest code`
}

export async function putUpWebApp(
  slug: string,
  sha: string,
  given: Given,
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
    deployable.manifestsPath === null
      ? `code\t${deployable.synthPath}`
      : `manifests\t${deployable.manifestsPath}`,
  ]

  const plan = await plannedAt(deployable, codeAt, sha)
  if (typeof plan === "string") return answeredWith(report, [plan], DATA)

  const left = unfilledOf(plan)
  if (left.length > 0) {
    return answeredWith(
      report,
      left.map((one) => `${one}, and applying it would write the stand-in itself into the cluster`),
      DATA
    )
  }

  const alreadyUp = upAlready(workload)
  report.push(`standing\t${alreadyUp ? "up" : "not up"}`)

  const placing = (): readonly string[] => {
    const refusals: string[] = []
    try {
      for (const one of placingBetween(given.root, report)(plan)) {
        report.push(`kubectl\t${one.argv.join(" ")}\t${one.stdout.trim().split("\n").join("; ")}`)
        if (one.code !== 0) {
          refusals.push(`kubectl ${one.argv.join(" ")} exited ${one.code}: ${one.stderr.trim()}`)
        }
      }
    } catch (thrown) {
      if (!(thrown instanceof DeployRefused)) throw thrown
      refusals.push(thrown.message)
    }
    return refusals
  }

  if (alreadyUp) {
    const refusals = placing()
    if (refusals.length > 0) return answeredWith(report, refusals, OPERATIONAL)
  }

  const carried = carriedByOrigin(given.root, sha)
  if ("why" in carried) return answeredWith(report, [carried.why], OPERATIONAL)
  report.push(
    `source\t${sha}\t${carried.carried ? "origin carries it" : "origin does not carry it"}`
  )
  if (!carried.carried) {
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

  const putting: Putting = {
    deployable,
    plan,
    sha,
    root: given.root,
    codeAt,
    alreadyUp,
    report,
    up,
  }
  const image = imageTargetOf(plan)
  if (image !== null) return await imagePutUp(image, putting)

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
    const ready = readied(putting, target.namespace)
    if ("refused" in ready) return ready.refused
    resolved = ready.resolved
  }

  const matched = differing(plan, report)
  if ("why" in matched) return answeredWith(report, [matched.why], OPERATIONAL)
  const differs = matched.differs
  if (!differs && alreadyUp && isBuilt) {
    report.push(nothingSaid(putting))
    return told(report)
  }

  let builtNow = false
  if (target !== null && !isBuilt) {
    const built = buildInPod(target, sha, resolved, !differs && alreadyUp)
    for (const one of built.ran) {
      report.push(`ran\t${one.argv.slice(0, SAID).join(" ")}\texited ${one.code}`)
    }
    if (built.why !== null) {
      if (differs || !alreadyUp) {
        report.push(
          "applying\tthe pod would not take the build, so the manifests a pod starts on are applied before this stops"
        )
        applied(putting)
      }
      return answeredWith(report, [built.why], OPERATIONAL)
    }
    builtNow = true
    up.push(`${target.packagePath}, built in the pod from ${sha}`)
  }

  if (differs || !alreadyUp) {
    const refusals = applied(putting)
    if (refusals.length > 0) return answeredWith(report, refusals, OPERATIONAL)
  }

  if (target !== null && builtNow) {
    const serving = livePod(target)
    report.push(
      serving === null
        ? `built\t${target.packagePath}\tfrom ${sha}, and no pod the cluster calls running has it`
        : `built\t${target.packagePath}\tin ${serving} from ${sha}`
    )
  }

  report.push(upSaid(putting))
  return told(report)
}
