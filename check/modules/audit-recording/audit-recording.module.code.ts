import {
  answerLine,
  commitHeld,
  loggedLine,
  type Verdict,
  verdictOver,
} from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import { costSpawned } from "akasha/check/modules/cost/check-cost.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Held } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { appendingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const AUDIT = "audit"

export type Beside = {
  readonly slug: string
  readonly page: string
  readonly root: string
}

export type Recording = (page: string, under: string, line: string) => Promise<string | null>

export const throughPages: Recording = async (page, under, line) => {
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
  return await record(
    one.page,
    under,
    loggedLine(cost, verdictOver(said, commitHeld(one.root), ranAt))
  )
}
