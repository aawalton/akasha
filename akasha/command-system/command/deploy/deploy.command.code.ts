import {
  alreadyBuilt,
  buildInPod,
  buildTargetOf,
  carriedByOrigin,
  headOf,
  inPod,
  livePod,
  pushToOrigin,
  saidBy,
} from "../../../service-system/cluster-service/web-app-building/web-app-building.module.code.ts"
import { deployableNamed } from "../../../service-system/cluster-service/web-app-reading/web-app-reading.module.code.ts"
import {
  planFor,
  putUp,
  standInsOf,
  standingOf,
  upAlready,
  writeManifests,
} from "../../../service-system/cluster-service/workload-deploying/workload-deploying.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"

const INPUT = 1
const DATA = 2
const OPERATIONAL = 3
const DRY_RUN = "--dry-run"
const SAID = 4

function refused(said: string, code: number): Answer {
  return { report: [], refusals: [said], code }
}

export async function deploy(argv: readonly string[], given: Given): Promise<Answer> {
  const strange = argv.find((one) => one.startsWith("-") && one !== DRY_RUN)
  if (strange !== undefined) {
    return refused(`\`${strange}\` is nothing \`akasha deploy\` takes`, INPUT)
  }
  const named = argv.filter((one) => !one.startsWith("-"))
  if (named.length === 0) {
    return refused("name the web app to put up by the slug its page carries", INPUT)
  }
  if (named.length > 1) {
    return refused(
      `a deploy puts up one web app, and ${named.length} were named, so which one is meant is unsettled: ${named.join(", ")}`,
      INPUT
    )
  }

  const slug = named[0] as string
  const read = deployableNamed(given.root, slug)
  if ("refused" in read) return refused(read.refused, DATA)
  const standing = read.deployable
  const workload = standing.workload

  const report: string[] = [
    `web-app\t${standing.slug}\t${standing.pagePath}`,
    `cluster-service\t${standing.clusterServiceSlug}\t${standing.servicePath}`,
    `workload\t${workload.kind} ${workload.namespace}/${workload.name}`,
    `code\t${standing.synthPath}`,
  ]

  const plan = await planFor(given.root, workload, standing.synthPath)
  if (typeof plan === "string") return { report, refusals: [plan], code: DATA }

  const left = standInsOf(plan)
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
    `source\t${sha}\t${carried.carried ? "origin carries it" : "origin does not carry it yet"}`
  )

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

  let differs = false
  for (const manifest of plan.manifests) {
    const stands = standingOf(manifest)
    if ("why" in stands) return { report, refusals: [stands.why], code: OPERATIONAL }
    report.push(`manifest\t${manifest.path}\t${stands.stands ? "stands" : "differs"}`)
    if (!stands.stands) differs = true
  }
  const up = upAlready(workload)
  report.push(`standing\t${up ? "up" : "not up"}`)

  if (!differs && up && isBuilt) {
    report.push(
      `nothing\tthe cluster already stands as ${standing.slug}'s page describes, at ${sha}`
    )
    return { report, refusals: [], code: 0 }
  }

  if (argv.includes(DRY_RUN)) {
    report.push("dry-run\tnothing was applied; run it again without `--dry-run` to carry it out")
    return { report, refusals: [], code: 0 }
  }

  if (target !== null && !isBuilt && !carried.carried) {
    const pushed = pushToOrigin(given.root, sha)
    if (pushed.code !== 0) {
      return {
        report,
        refusals: [
          `origin would not take ${sha} onto main, and a pod builds what origin carries, so building here would put up code nobody wrote: ${saidBy(pushed)}`,
        ],
        code: OPERATIONAL,
      }
    }
    report.push(`pushed\t${sha}\tonto origin main`)
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
    const built = buildInPod(target, sha)
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
