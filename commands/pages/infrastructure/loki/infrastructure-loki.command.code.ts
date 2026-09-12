import {
  codeOf,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
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

const POD = "--pod"

const NAMESPACE = "--namespace"

const SINCE = "--since"

const LIMIT = "--limit"

const CURSOR = "--cursor"

const ALL = "--all"

const VALUED = [POD, NAMESPACE, SINCE, LIMIT, CURSOR]

const NAMESPACE_BY_DEFAULT = "ci"

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

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const words: string[] = []
  const said = new Map<string, string>()
  let all = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (VALUED.includes(one)) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("-")) {
        refusals.push(`\`${one}\` names a value, and none followed it`)
        continue
      }
      said.set(one, value)
      continue
    }
    if (one === ALL) {
      all = true
      continue
    }
    if (one.startsWith("-")) {
      refusals.push(
        `\`${one}\` is no flag this takes — it takes \`${[...VALUED, ALL].join("`, `")}\``
      )
      continue
    }
    words.push(one)
  }
  if (words.length > 1) {
    refusals.push(`\`${words[1]}\` follows the pod, and one call names one pod`)
  }
  const loose = words[0]
  if (loose !== undefined) {
    if (said.has(POD)) {
      refusals.push(`\`${loose}\` sits where the pod goes, and \`${POD}\` already names one`)
    } else {
      said.set(POD, loose)
    }
  }
  const pod = said.get(POD)
  if (pod === undefined) {
    refusals.push(`the pod is said as the first word or with \`${POD}\`, and neither was said`)
  }
  const namespace = said.get(NAMESPACE) ?? NAMESPACE_BY_DEFAULT
  const since = said.get(SINCE) ?? SINCE_BY_DEFAULT
  try {
    parseLokiDuration(SINCE, since)
  } catch (thrown) {
    refusals.push(whyOf(thrown))
  }
  let limit = 0
  try {
    limit = parseLokiPositiveInt(LIMIT, said.get(LIMIT) ?? LIMIT_BY_DEFAULT)
  } catch (thrown) {
    refusals.push(whyOf(thrown))
  }
  if (refusals.length > 0 || pod === undefined) return { refused: refusals }
  return {
    pod,
    namespace,
    since,
    limit,
    cursor: said.get(CURSOR) ?? null,
    all,
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
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  try {
    return await fetching(read, given.calledAs)
  } catch (thrown) {
    return refused(whyOf(thrown), codeOf(thrown))
  }
}
