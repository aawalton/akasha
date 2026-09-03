import {
  type InnerReport,
  type StoreVariant,
  StoreVariantSchema,
} from "@akasha/ci-benchmark/benchmark-report-types"
import {
  countOutOfCpuEvents,
  createJob,
  readJobPodLogs,
  waitForJob,
} from "@akasha/cluster-api/cluster-jobs"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { told as gitTold } from "@akasha/git/git-running"
import { asHostname, type Hostname } from "@akasha/k8s-types/hostnames"
import { buildBenchmarkJob } from "@tools/lib/benchmark-job"
import { sweepMargins } from "@tools/lib/benchmark-margin-sweep"
import {
  assembleOuterReport,
  buildMarginSweepGrid,
  parseInnerReportFromLogs,
} from "@tools/lib/benchmark-outer-core"
import { renderReport } from "@tools/lib/benchmark-outer-render"
import {
  answering,
  countOf,
  DATA,
  INPUT,
  JSON_SAID,
  OK,
  OPERATIONAL,
  type Reading,
  refusedBy,
  wordsIn,
} from "../pipeline-answering/pipeline-answering.module.code.ts"

const NODE = "--node"

const STORE = "--store"

const SHA = "--sha"

const TIMEOUT_MIN = "--timeout-min"

const VALUED = [NODE, STORE, SHA, TIMEOUT_MIN]

const SWITCHES = [JSON_SAID]

const NAMESPACE = "ci"

const DEFAULT_NODE = "node-06"

const DEFAULT_TIMEOUT_MIN = 45

const MINUTE_MS = 60_000

const BOTH: readonly StoreVariant[] = ["disk", "memory"]

export type Read = {
  readonly node: string
  readonly store: string | undefined
  readonly sha: string | undefined
  readonly timeoutMin: number
  readonly json: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return said
  const refusals: string[] = said.loose.map(
    (one) => `\`${one}\` follows nothing this takes — it takes flags alone`
  )
  const minutes = countOf(said.named[TIMEOUT_MIN], TIMEOUT_MIN, null)
  if (typeof minutes === "object" && minutes !== null) refusals.push(...minutes.refused)
  if (refusals.length > 0) return { refused: refusals }
  return {
    node: said.named[NODE] ?? DEFAULT_NODE,
    store: said.named[STORE],
    sha: said.named[SHA],
    timeoutMin: typeof minutes === "number" ? minutes : DEFAULT_TIMEOUT_MIN,
    json: said.flags.has(JSON_SAID),
  }
}

type Seen = {
  readonly node: Hostname
  readonly windowStartMs: number
  readonly windowEndMs: number
  readonly count: number | null
  readonly unavailableReason: string | null
}

type Measured = {
  readonly report: InnerReport | null
  readonly said: readonly string[]
}

async function measuring(args: {
  readonly node: Hostname
  readonly store: StoreVariant
  readonly targetSha: string
  readonly timeoutMs: number
}): Promise<Measured> {
  const manifest = await buildBenchmarkJob({
    node: args.node,
    store: args.store,
    targetSha: args.targetSha,
    runId: `${Date.now().toString(36)}-${args.store}`,
  })
  const { name } = await createJob(NAMESPACE, manifest)
  const said = [`Job ${name} was created, pinned to ${args.node}, over the ${args.store} store`]
  const outcome = await waitForJob(NAMESPACE, name, { timeoutMs: args.timeoutMs })
  const logs = await readJobPodLogs(NAMESPACE, name)
  try {
    const report = await parseInnerReportFromLogs(logs)
    said.push(`the ${args.store} store was measured, and the Job ended ${outcome.outcome}`)
    return { report, said }
  } catch {
    said.push(
      `the ${args.store} store went UNMEASURED — the Job ended ${outcome.outcome} emitting no report`
    )
    return { report: null, said }
  }
}

async function measured(read: Read, given: Given): Promise<Answer> {
  const node = asHostname(read.node)
  if (node === undefined) {
    return { report: [], refusals: [`\`${read.node}\` is no node of this cluster`], code: INPUT }
  }
  const targetSha = read.sha ?? gitTold(given.root, ["rev-parse", "origin/main"])?.trim()
  if (targetSha === undefined || targetSha === "") {
    return {
      report: [],
      refusals: ["the head of `origin/main` could not be read, so name the commit with `--sha`"],
      code: OPERATIONAL,
    }
  }
  const variants: readonly StoreVariant[] =
    read.store === undefined ? BOTH : [StoreVariantSchema.parse(read.store)]

  const windowStartMs = Date.now()
  const inners = new Map<StoreVariant, InnerReport>()
  const unmeasured: StoreVariant[] = []
  const along: string[] = []
  for (const store of variants) {
    const one = await measuring({
      node,
      store,
      targetSha,
      timeoutMs: read.timeoutMin * MINUTE_MS,
    })
    along.push(...one.said)
    if (one.report === null) unmeasured.push(store)
    else inners.set(store, one.report)
  }

  const outOfCpuObserved: Seen = await countOutOfCpuEvents(node, windowStartMs)
    .then(
      (count): Seen => ({
        node,
        windowStartMs,
        windowEndMs: Date.now(),
        count,
        unavailableReason: null,
      })
    )
    .catch((thrown: unknown): Seen => {
      const why = whyOf(thrown)
      along.push(`the observed OutOfcpu family is unavailable — ${why}`)
      return {
        node,
        windowStartMs,
        windowEndMs: Date.now(),
        count: null,
        unavailableReason: `OutOfcpu event sampling failed: ${why}`,
      }
    })

  const report = await assembleOuterReport({
    nodeUnderTest: node,
    targetSha,
    generatedAtMs: Date.now(),
    inners,
    unmeasuredVariants: unmeasured,
    outOfCpuObserved,
    marginSweep: sweepMargins(buildMarginSweepGrid(node)),
  })

  const refusals: string[] = []
  if (unmeasured.length > 0) {
    refusals.push(`${unmeasured.length} variant went unmeasured: ${unmeasured.join(", ")}`)
  }
  if (report.undeclaredReds.length > 0) {
    refusals.push(
      "a red beyond the declared environmental set stands, so this run says nothing until that red is understood"
    )
  }
  const said = read.json ? [JSON.stringify(report)] : renderReport(report).split("\n")
  return {
    report: [...along, ...said],
    refusals,
    code: refusals.length > 0 ? DATA : OK,
  }
}

export async function pipelineBenchmark(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(() => measured(read, given))
}
