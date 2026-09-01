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

  let differs = false
  for (const manifest of plan.manifests) {
    const held = standingOf(manifest)
    if ("why" in held) return { report, refusals: [held.why], code: OPERATIONAL }
    report.push(`manifest\t${manifest.path}\t${held.stands ? "stands" : "differs"}`)
    if (!held.stands) differs = true
  }
  const up = upAlready(workload)
  report.push(`standing\t${up ? "up" : "not up"}`)

  if (!differs && up) {
    report.push(`nothing\tthe cluster already stands as ${standing.slug}'s page describes`)
    return { report, refusals: [], code: 0 }
  }

  if (argv.includes(DRY_RUN)) {
    report.push("dry-run\tnothing was applied; run it again without `--dry-run` to carry it out")
    return { report, refusals: [], code: 0 }
  }

  for (const one of writeManifests(given.root, plan)) report.push(`wrote\t${one}`)

  const refusals: string[] = []
  for (const one of putUp(plan)) {
    report.push(`kubectl\t${one.argv.join(" ")}\t${one.stdout.trim().split("\n").join("; ")}`)
    if (one.code !== 0) {
      refusals.push(`kubectl ${one.argv.join(" ")} exited ${one.code}: ${one.stderr.trim()}`)
    }
  }
  if (refusals.length > 0) return { report, refusals, code: OPERATIONAL }
  report.push(
    `up\t${workload.kind} ${workload.namespace}/${workload.name} stands as its page describes`
  )
  return { report, refusals: [], code: 0 }
}
