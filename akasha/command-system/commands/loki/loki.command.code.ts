import { exitCodeForThrowable } from "@akasha/errors-core/exit-code"
import { chooseLogsDiagnostic, describeBounds } from "@akasha/service-system/log-bound-saying"
import {
  fetchAllLokiLogs,
  fetchLokiLogs,
  findPodNamespaces,
  hasLinesBeforeWindow,
  LOKI_RETENTION_LABEL,
  type LogEntry,
  parseLokiDuration,
  parseLokiPositiveInt,
} from "@akasha/service-system/loki-log-fetching"
import { commitSha40, inputsHash12 } from "@akasha/workflow-language/ci-identifiers"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"
import { whyOf } from "../../fault-saying/fault-saying.module.code.ts"

export const LOGS = "logs"

const ACTS = [LOGS]

const POD = "--pod"

const NAMESPACE = "--namespace"

const SINCE = "--since"

const LIMIT = "--limit"

const TAIL = "--tail"

const CURSOR = "--cursor"

const ALL = "--all"

const COMMIT_SHA = "--commit-sha"

const INPUTS_HASH = "--inputs-hash"

const VALUED = [POD, NAMESPACE, SINCE, LIMIT, TAIL, CURSOR, COMMIT_SHA, INPUTS_HASH]

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
      readonly commitSha: string | undefined
      readonly inputsHash: string | undefined
    }
  | { readonly refused: readonly string[] }

function stamped(flag: string, raw: string, read: (said: string) => string): string | string[] {
  try {
    return read(raw)
  } catch (thrown) {
    return [`${flag}: ${whyOf(thrown)}`]
  }
}

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
      said.set(one === TAIL ? LIMIT : one, value)
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
  const act = words[0]
  if (act === undefined) {
    return { refused: [...refusals, `this names no act — it carries \`${ACTS.join("`, `")}\``] }
  }
  if (!ACTS.includes(act)) {
    return {
      refused: [
        ...refusals,
        `\`${act}\` is no act this carries — it carries \`${ACTS.join("`, `")}\``,
      ],
    }
  }
  const rest = words.slice(1)
  if (rest.length > 1) {
    refusals.push(`\`${rest[1]}\` follows the pod, and one call names one act and one pod`)
  }
  const loose = rest[0]
  if (loose !== undefined) {
    if (said.has(POD)) {
      refusals.push(`\`${loose}\` stands where the pod goes, and \`${POD}\` already names one`)
    } else {
      said.set(POD, loose)
    }
  }
  const pod = said.get(POD)
  if (pod === undefined) refusals.push(`\`${LOGS}\` names a pod, and none was said`)
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
  let commitSha: string | undefined
  const commitShaSaid = said.get(COMMIT_SHA)
  if (commitShaSaid !== undefined) {
    const read = stamped(COMMIT_SHA, commitShaSaid, commitSha40)
    if (Array.isArray(read)) refusals.push(...read)
    else commitSha = read
  }
  let inputsHash: string | undefined
  const inputsHashSaid = said.get(INPUTS_HASH)
  if (inputsHashSaid !== undefined) {
    const read = stamped(INPUTS_HASH, inputsHashSaid, inputsHash12)
    if (Array.isArray(read)) refusals.push(...read)
    else inputsHash = read
  }
  if (refusals.length > 0 || pod === undefined) return { refused: refusals }
  return {
    pod,
    namespace,
    since,
    limit,
    cursor: said.get(CURSOR) ?? null,
    all,
    commitSha,
    inputsHash,
  }
}

async function boundingLine(
  read: Exclude<Read, { refused: readonly string[] }>,
  lines: readonly LogEntry[],
  isDone: boolean,
  cursor: string | null
): Promise<string> {
  const { pod, namespace, since, limit, commitSha, inputsHash } = read
  const older = isDone
    ? await hasLinesBeforeWindow({ pod, namespace, since, commitSha, inputsHash })
    : null
  const elsewhere =
    lines.length === 0
      ? (await findPodNamespaces({ pod, since })).filter((one) => one !== namespace)
      : []
  const diagnostic = chooseLogsDiagnostic({
    command: "akasha loki logs",
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

async function fetching(read: Exclude<Read, { refused: readonly string[] }>): Promise<Answer> {
  const { pod, namespace, since, limit, cursor, commitSha, inputsHash } = read
  const fetched = read.all
    ? {
        lines: await fetchAllLokiLogs({ pod, namespace, since, commitSha, inputsHash }),
        cursor: null,
        isDone: true,
      }
    : await fetchLokiLogs({ pod, namespace, since, limit, cursor, commitSha, inputsHash })
  const report = fetched.lines.map((one) => JSON.stringify(one))
  report.push(await boundingLine(read, fetched.lines, fetched.isDone, fetched.cursor))
  return { report, refusals: [], code: 0 }
}

export async function loki(argv: readonly string[], _given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return await fetching(read)
  } catch (thrown) {
    const carried = exitCodeForThrowable(thrown)
    return refused(whyOf(thrown), carried === 70 ? 3 : carried)
  }
}
