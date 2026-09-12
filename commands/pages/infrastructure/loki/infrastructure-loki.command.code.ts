import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { cursor as cursorArgument } from "akasha/commands/arguments/pages/cursor.argument.ts"
import { everyLine } from "akasha/commands/arguments/pages/every-line.argument.ts"
import { kubeNamespace } from "akasha/commands/arguments/pages/kube-namespace.argument.ts"
import { limit as limitArgument } from "akasha/commands/arguments/pages/limit.argument.ts"
import { pod as podArgument } from "akasha/commands/arguments/pages/pod.argument.ts"
import { since as sinceArgument } from "akasha/commands/arguments/pages/since.argument.ts"
import {
  codeOf,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { infrastructureLoki as page } from "akasha/commands/pages/infrastructure/loki/infrastructure-loki.command.ts"
import {
  chooseLogsDiagnostic,
  describeBounds,
} from "akasha/infrastructure/services/clusters/log-bound-saying/log-bound-saying.module.code.ts"
import {
  fetchAllLokiLogs,
  fetchLokiLogs,
  findPodNamespaces,
  hasLinesBeforeWindow,
  LOKI_RETENTION_LABEL,
  type LogEntry,
  parseLokiDuration,
  parseLokiPositiveInt,
} from "akasha/infrastructure/services/clusters/loki-log-fetching/loki-log-fetching.module.code.ts"

const SINCE_BY_DEFAULT = "1h"

const LIMIT_BY_DEFAULT = "500"

export type Read =
  | {
      readonly pod: string
      readonly namespace: string
      readonly since: string
      readonly limit: number
      readonly cursor: string | null
      readonly all: boolean
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, [
    limitArgument,
    podArgument,
    kubeNamespace,
    cursorArgument,
    everyLine,
    sinceArgument,
  ])
  if ("refused" in read) return { refused: read.refused }
  const taken = read.taken
  const refusals: string[] = []
  const since = taken.since ?? SINCE_BY_DEFAULT
  try {
    parseLokiDuration(sinceArgument.said, since)
  } catch (thrown) {
    refusals.push(whyOf(thrown))
  }
  let limit = 0
  try {
    limit = parseLokiPositiveInt(limitArgument.said, String(taken.limit ?? LIMIT_BY_DEFAULT))
  } catch (thrown) {
    refusals.push(whyOf(thrown))
  }
  if (refusals.length > 0) return { refused: refusals }
  return {
    pod: taken.pod,
    namespace: taken.kubeNamespace,
    since,
    limit,
    cursor: taken.cursor ?? null,
    all: taken.everyLine,
  }
}

async function boundingLine(
  read: Exclude<Read, { refused: readonly string[] }>,
  lines: readonly LogEntry[],
  isDone: boolean,
  cursor: string | null,
  calledAs: string
): Promise<string> {
  const { pod, namespace, since, limit } = read
  const older = isDone ? await hasLinesBeforeWindow({ pod, namespace, since }) : null
  const elsewhere =
    lines.length === 0
      ? (await findPodNamespaces({ pod, since })).filter((one) => one !== namespace)
      : []
  const diagnostic = chooseLogsDiagnostic({
    command: calledAs,
    pod,
    namespace,
    since,
    lineCount: lines.length,
    isDone,
    limit,
    olderLinesBeforeWindow: older,
    retentionLabel: LOKI_RETENTION_LABEL,
    otherNamespaces: elsewhere,
  })
  return JSON.stringify({
    bounding: true,
    count: lines.length,
    cursor,
    isDone,
    ...describeBounds({ isDone, olderLinesBeforeWindow: older }),
    diagnostic: diagnostic === null ? null : diagnostic.message,
  })
}

async function fetching(
  read: Exclude<Read, { refused: readonly string[] }>,
  calledAs: string
): Promise<Answer> {
  const { pod, namespace, since, limit, cursor } = read
  const fetched = read.all
    ? {
        lines: await fetchAllLokiLogs({ pod, namespace, since }),
        cursor: null,
        isDone: true,
      }
    : await fetchLokiLogs({ pod, namespace, since, limit, cursor })
  const report = fetched.lines.map((one) => JSON.stringify(one))
  report.push(await boundingLine(read, fetched.lines, fetched.isDone, fetched.cursor, calledAs))
  return told(report)
}

export async function infrastructureLoki(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv, given.calledAs)
  if ("refused" in read) return refusedBy(read.refused)
  try {
    return await fetching(read, given.calledAs)
  } catch (thrown) {
    return refused(whyOf(thrown), codeOf(thrown))
  }
}
