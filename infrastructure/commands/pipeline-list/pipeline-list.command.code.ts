import type { Answer } from "@akasha/command-system/calling"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { commitSha40, toShortSha7 } from "@akasha/workflow-language/ci-identifiers"
import {
  answering,
  asJson,
  countOf,
  JSON_SAID,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../pipeline-answering/pipeline-answering.module.code.ts"
import {
  listPipelines,
  optionalNumber,
  optionalString,
} from "../pipeline-page-reading/pipeline-page-reading.module.code.ts"

const BRANCH = "--branch"

const STATUS = "--status"

const LIMIT = "--limit"

const VALUED = [BRANCH, STATUS, LIMIT]

const SWITCHES = [JSON_SAID]

const DEFAULT_LIMIT = 20

const MINUTE = 60

const HOUR = 24

export type Read = {
  readonly branch: string | undefined
  readonly status: string | undefined
  readonly limit: number
  readonly json: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return said
  const refusals: string[] = said.loose.map(
    (one) => `\`${one}\` follows nothing this takes — it takes flags alone`
  )
  const limit = countOf(said.named[LIMIT], LIMIT, null)
  if (typeof limit === "object" && limit !== null) refusals.push(...limit.refused)
  if (refusals.length > 0) return { refused: refusals }
  return {
    branch: said.named[BRANCH],
    status: said.named[STATUS],
    limit: typeof limit === "number" ? limit : DEFAULT_LIMIT,
    json: said.flags.has(JSON_SAID),
  }
}

export function shortSha(sha: string | undefined): string {
  if (sha === undefined) return ""
  try {
    return toShortSha7(commitSha40(sha))
  } catch {
    return ""
  }
}

export function agedFrom(moment: string | undefined, nowMs: number): string {
  if (moment === undefined) return ""
  const then = Date.parse(moment)
  if (!Number.isFinite(then)) return ""
  const seconds = Math.floor(Math.max(nowMs - then, 0) / 1000)
  if (seconds < MINUTE) return `${seconds}s`
  const minutes = Math.floor(seconds / MINUTE)
  if (minutes < MINUTE) return `${minutes}m`
  const hours = Math.floor(minutes / MINUTE)
  return hours < HOUR ? `${hours}h` : `${Math.floor(hours / HOUR)}d`
}

function listed(read: Read): Answer {
  const rows = listPipelines(resolveRoots(), {
    ...(read.branch === undefined ? {} : { branch: read.branch }),
    ...(read.status === undefined ? {} : { status: read.status }),
    limit: read.limit,
  })
  const projected = rows.map((row) => {
    const commitSha = optionalString(row, "commit")
    return {
      seq: optionalNumber(row, "seq"),
      status: optionalString(row, "status"),
      branch: optionalString(row, "branch"),
      commitSha,
      shortSha: shortSha(commitSha),
      createdAt: optionalString(row, "createdAt"),
      updatedAt: optionalString(row, "updatedAt"),
      supersededBy: optionalNumber(row, "overtakenBySeq"),
    }
  })
  if (read.json) return asJson(projected)
  const nowMs = Date.now()
  return told(
    projected.map(
      (one) =>
        `${one.seq ?? ""}\t${one.status ?? ""}\t${one.branch ?? ""}\t${one.shortSha}\t` +
        `${agedFrom(one.createdAt, nowMs)}\t${one.supersededBy ?? ""}`
    )
  )
}

export async function pipelineList(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(() => listed(read))
}
