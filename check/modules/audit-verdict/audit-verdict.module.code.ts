import { existsSync } from "node:fs"
import { join } from "node:path"
import { type Cost, recorded } from "akasha/check/modules/cost/check-cost.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  heldTo,
  reasonSaid,
} from "akasha/check/modules/refusal-holding/refusal-holding.module.code.ts"
import { textOnDisk } from "akasha/file/disk/modules/text-on-disk/text-on-disk.module.code.ts"
import { runGit } from "akasha/git/modules/answering/git-answering.module.code.ts"
import { told as gitTold } from "akasha/git/modules/running/git-running.module.code.ts"
import { FIRST_PART } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { uncommittedPartAt } from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"

const REFUSAL_CEILING = 4000

const REFUSED_CEILING = 120000

const HELD = "jsonl"

const PHASE = "audit"

export type Verdict = {
  readonly commit: string
  readonly ranAt: string
  readonly refusals: readonly string[]
  readonly unrun: boolean
}

export function verdictRowIn(line: string): Verdict | null {
  let held: unknown
  try {
    held = JSON.parse(line)
  } catch {
    return null
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  const said = held as Record<string, unknown>
  const commit = said.commit
  const ranAt = said.ranAt
  const refused = said.refused
  if (typeof commit !== "string" || commit === "") return null
  if (typeof ranAt !== "string" || !Array.isArray(refused)) return null
  return {
    commit,
    ranAt,
    refusals: refused.filter((one): one is string => typeof one === "string"),
    unrun: said.unrun === true,
  }
}

function partsThere(root: string, page: string, under: string): readonly string[] {
  const found: string[] = []
  for (let part = FIRST_PART; ; part += 1) {
    const at = uncommittedPartAt(page, under, HELD, part)
    if (at === null || !existsSync(join(root, at))) return found
    found.push(at)
  }
}

export function verdictLogged(root: string, page: string, under: string): Verdict | null {
  const parts = partsThere(root, page, under)
  for (let part = parts.length - 1; part >= 0; part -= 1) {
    const text = textOnDisk(join(root, parts[part] ?? ""))
    if (text === null) continue
    const lines = text.split("\n")
    for (let line = lines.length - 1; line >= 0; line -= 1) {
      const said = verdictRowIn(lines[line] ?? "")
      if (said !== null) return said
    }
  }
  return null
}

export function measured(verdict: Verdict): boolean {
  return !verdict.unrun
}

export function cleanly(verdict: Verdict): boolean {
  return measured(verdict) && verdict.refusals.length === 0
}

export async function atOrAfter(root: string, asked: string, ran: string): Promise<boolean> {
  if (asked === ran) return true
  return (await runGit(["merge-base", "--is-ancestor", asked, ran], root)).ok
}

export async function cleanAt(
  root: string,
  verdict: Verdict | null,
  asked: string
): Promise<boolean> {
  if (verdict === null || !cleanly(verdict)) return false
  return await atOrAfter(root, asked, verdict.commit)
}

export function verdictOver(found: readonly Judged[], commit: string, ranAt: string): Verdict {
  return {
    commit,
    ranAt,
    refusals: found.map((one) => `${one.path} — ${one.reason}`),
    unrun: found.some((one) => one.threw === true),
  }
}

export function commitHeld(root: string): string {
  return gitTold(root, ["rev-parse", "HEAD"])?.trim() ?? ""
}

type Logged = Cost & {
  readonly commit: string
  readonly refused: readonly string[]
  readonly unrun: boolean
}

function refusedHeld(refusals: readonly string[]): readonly string[] {
  return heldTo(
    refusals.map((one) => reasonSaid(one, REFUSAL_CEILING)),
    REFUSED_CEILING
  )
}

function loggedOf(cost: Cost, verdict: Verdict): Logged {
  return {
    ...cost,
    commit: verdict.commit,
    refused: refusedHeld(verdict.refusals),
    unrun: verdict.unrun,
  }
}

export function loggedLine(cost: Cost, verdict: Verdict): string {
  return JSON.stringify(loggedOf(cost, verdict))
}

export function answerLine(ran: string, verdict: Verdict): string {
  return JSON.stringify({
    ran,
    phase: PHASE,
    ranAt: verdict.ranAt,
    commit: verdict.commit,
    refused: refusedHeld(verdict.refusals),
    unrun: verdict.unrun,
  })
}

export function verdictRecorded(
  root: string,
  page: string,
  cost: Cost,
  verdict: Verdict,
  under: string
): string | null {
  return recorded(root, page, `${loggedLine(cost, verdict)}\n`, under)
}

export function verdictAnswered(
  root: string,
  page: string,
  ran: string,
  verdict: Verdict,
  under: string
): string | null {
  return recorded(root, page, `${answerLine(ran, verdict)}\n`, under)
}
