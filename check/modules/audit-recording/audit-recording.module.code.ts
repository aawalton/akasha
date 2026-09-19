import {
  answerLine,
  commitHeld,
  loggedLine,
  type Verdict,
  verdictOver,
} from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import {
  type Cost,
  closing,
  costOf,
  costSpawned,
  type Taken,
} from "akasha/check/modules/cost/check-cost.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Held } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { appendingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const AUDIT = "audit"

const ROUND = "round"

const COMMAND = "command"

const ENTRIES = "entries"

export type Beside = {
  readonly slug: string
  readonly page: string
  readonly root: string
}

export type Recording = (page: string, under: string, line: string) => Promise<string | null>

const throughPages: Recording = async (page, under, line) => {
  const said = await appendingFor({ path: page, under, lines: [line] })
  return "appended" in said ? said.appended : null
}

export async function verdictSent(
  page: string,
  ran: string,
  verdict: Verdict,
  under: string,
  record: Recording = throughPages
): Promise<string | null> {
  return await record(page, under, answerLine(ran, verdict))
}

export async function rowSent(
  page: string,
  cost: Cost,
  verdict: Verdict,
  under: string,
  record: Recording = throughPages
): Promise<string | null> {
  return await record(page, under, loggedLine(cost, verdict))
}

async function costSent(
  page: string,
  cost: Cost,
  under: string,
  record: Recording = throughPages
): Promise<string | null> {
  return await record(page, under, JSON.stringify(cost))
}

export function auditPageAt(root: string): string | null {
  return listedAt(root, COMMAND, AUDIT)[0]?.path ?? null
}

export async function roundCosted(
  root: string,
  before: Taken,
  refusals: number,
  record: Recording = throughPages
): Promise<string | null> {
  const page = auditPageAt(root)
  if (page === null) return null
  const cost = costOf(before, closing(), Bun.randomUUIDv7(), ROUND, AUDIT, 0, refusals)
  return await costSent(page, cost, ENTRIES, record)
}

export async function costKept(
  one: Beside,
  done: Held,
  began: number,
  said: readonly Judged[],
  under: string,
  record: Recording = throughPages
): Promise<string | null> {
  const ranAt = new Date(began).toISOString()
  const cost = costSpawned({
    runId: Bun.randomUUIDv7(),
    ranAt,
    phase: AUDIT,
    ran: one.slug,
    wallMs: Date.now() - began,
    cpuSeconds: done.cpuSeconds,
    peakBytes: done.peakBytes,
    peakMeasured: done.peakMeasured,
    refusals: said.length,
  })
  return await rowSent(
    one.page,
    cost,
    verdictOver(said, commitHeld(one.root), ranAt),
    under,
    record
  )
}
