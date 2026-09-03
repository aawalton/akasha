import type { Answer } from "@akasha/command-system/calling"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { chooseLogsDiagnostic, describeBounds } from "@akasha/service-system/log-bound-saying"
import {
  fetchAllLokiLogs,
  fetchLokiLogs,
  findPodNamespaces,
  hasLinesBeforeWindow,
  LOKI_RETENTION_LABEL,
  parseLokiDuration,
  parseLokiPositiveInt,
} from "@akasha/service-system/loki-log-fetching"
import {
  aloneIn,
  answering,
  asJson,
  JSON_SAID,
  OK,
  type Reading,
  refusedBy,
  seqOf,
  wordsIn,
} from "../pipeline-answering/pipeline-answering.module.code.ts"
import {
  getPipelineBySeq,
  resolveStepPodName,
} from "../pipeline-page-reading/pipeline-page-reading.module.code.ts"

const WORKFLOW = "--workflow"

const STEP = "--step"

const NAMESPACE = "--namespace"

const SINCE = "--since"

const LIMIT = "--limit"

const CURSOR = "--cursor"

const ALL = "--all"

const VALUED = [WORKFLOW, STEP, NAMESPACE, SINCE, LIMIT, CURSOR]

const SWITCHES = [ALL, JSON_SAID]

const DEFAULT_NAMESPACE = "ci"

const DEFAULT_SINCE = "1h"

const DEFAULT_LIMIT = "500"

const CALLED_AS = "akasha pipeline-logs"

export type Read = {
  readonly seq: number
  readonly workflowName: string
  readonly stepName: string
  readonly namespace: string
  readonly since: string
  readonly limit: string
  readonly cursor: string | null
  readonly all: boolean
  readonly json: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return said
  const alone = aloneIn(said, "the pipeline's seq")
  if (typeof alone === "object" && alone !== null) return alone
  const refusals: string[] = []
  const workflowName = said.named[WORKFLOW]
  const stepName = said.named[STEP]
  if (workflowName === undefined) refusals.push(`this names \`${WORKFLOW}\`, and nothing did`)
  if (stepName === undefined) refusals.push(`this names \`${STEP}\`, and nothing did`)
  const seq = seqOf(alone)
  if (typeof seq === "object") refusals.push(...seq.refused)
  if (refusals.length > 0 || typeof seq === "object") return { refused: refusals }
  return {
    seq,
    workflowName: workflowName ?? "",
    stepName: stepName ?? "",
    namespace: said.named[NAMESPACE] ?? DEFAULT_NAMESPACE,
    since: said.named[SINCE] ?? DEFAULT_SINCE,
    limit: said.named[LIMIT] ?? DEFAULT_LIMIT,
    cursor: said.named[CURSOR] ?? null,
    all: said.flags.has(ALL),
    json: said.flags.has(JSON_SAID),
  }
}

async function olderLinesOf(args: {
  readonly pod: string
  readonly namespace: string
  readonly since: string
  readonly isDone: boolean
}): Promise<boolean | null> {
  if (!args.isDone) return null
  return await hasLinesBeforeWindow({
    pod: args.pod,
    namespace: args.namespace,
    since: args.since,
  })
}

async function boundSaid(args: {
  readonly pod: string
  readonly namespace: string
  readonly since: string
  readonly lineCount: number
  readonly isDone: boolean
  readonly limit: number
}): Promise<readonly string[]> {
  const { pod, namespace, since } = args
  const [olderLinesBeforeWindow, otherNamespaces] = await Promise.all([
    olderLinesOf({ pod, namespace, since, isDone: args.isDone }),
    args.lineCount === 0
      ? findPodNamespaces({ pod, since }).then((found) => found.filter((one) => one !== namespace))
      : Promise.resolve<readonly string[]>([]),
  ])
  const diagnostic = chooseLogsDiagnostic({
    ...args,
    command: CALLED_AS,
    retentionLabel: LOKI_RETENTION_LABEL,
    olderLinesBeforeWindow,
    otherNamespaces,
  })
  return diagnostic === null ? [] : [diagnostic.message]
}

async function fetched(read: Read): Promise<Answer> {
  parseLokiDuration(SINCE, read.since)
  const limit = parseLokiPositiveInt(LIMIT, read.limit)
  const roots = resolveRoots()
  const pipeline = getPipelineBySeq(roots, read.seq)
  const pod = resolveStepPodName(roots, pipeline, read.workflowName, read.stepName)
  const namespace = read.namespace
  const since = read.since

  const held = read.all
    ? { lines: await fetchAllLokiLogs({ pod, namespace, since }), cursor: null, isDone: true }
    : await fetchLokiLogs({ pod, namespace, since, limit, cursor: read.cursor })

  if (read.json) {
    const olderLinesBeforeWindow = await olderLinesOf({
      pod,
      namespace,
      since,
      isDone: held.isDone,
    })
    const { complete, boundedBy } = describeBounds({
      isDone: held.isDone,
      olderLinesBeforeWindow,
    })
    return asJson({
      lines: held.lines,
      count: held.lines.length,
      cursor: held.cursor,
      isDone: held.isDone,
      complete,
      boundedBy,
    })
  }
  return {
    report: held.lines.map((one) => JSON.stringify(one)),
    refusals: await boundSaid({
      pod,
      namespace,
      since,
      lineCount: held.lines.length,
      isDone: held.isDone,
      limit,
    }),
    code: OK,
  }
}

export async function pipelineLogs(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(() => fetched(read))
}
