import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { type Cost, recorded } from "akasha/check/modules/cost/check-cost.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  heldTo,
  reasonSaid,
} from "akasha/check/modules/refusal-holding/refusal-holding.module.code.ts"
import { runGit } from "akasha/git/modules/answering/git-answering.module.code.ts"
import { told as gitTold } from "akasha/git/modules/running/git-running.module.code.ts"
import { textOnDisk } from "akasha/util/fs/modules/text-on-disk/text-on-disk.module.code.ts"

const KEPT = ".local/state/workstation-services/audit-verdicts.json"

const REFUSAL_CEILING = 4000

const REFUSED_CEILING = 24000

export type Verdict = {
  readonly commit: string
  readonly ranAt: string
  readonly refusals: readonly string[]
  readonly unrun: boolean
}

export type Verdicts = Readonly<Record<string, Verdict>>

export function verdictsAt(home: string): string {
  return join(home, KEPT)
}

export function verdictIn(held: unknown): Verdict | null {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  const said = held as Record<string, unknown>
  const commit = said.commit
  const ranAt = said.ranAt
  if (typeof commit !== "string" || commit === "") return null
  if (typeof ranAt !== "string") return null
  const refusals = Array.isArray(said.refusals)
    ? said.refusals.filter((one): one is string => typeof one === "string")
    : []
  return { commit, ranAt, refusals, unrun: said.unrun === true }
}

export function verdictsIn(held: unknown): Verdicts {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return {}
  const kept: Record<string, Verdict> = {}
  for (const [slug, one] of Object.entries(held as Record<string, unknown>)) {
    const said = verdictIn(one)
    if (said !== null) kept[slug] = said
  }
  return kept
}

export function verdictsRead(home: string): Verdicts {
  const text = textOnDisk(verdictsAt(home))
  if (text === null) return {}
  let held: unknown
  try {
    held = JSON.parse(text)
  } catch {
    return {}
  }
  return verdictsIn(held)
}

export function verdictsWrite(home: string, verdicts: Verdicts): undefined {
  const at = verdictsAt(home)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify(verdicts, null, 2)}\n`)
}

export function verdictKept(verdicts: Verdicts, check: string, verdict: Verdict): Verdicts {
  return { ...verdicts, [check]: verdict }
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
  verdicts: Verdicts,
  check: string,
  asked: string
): Promise<boolean> {
  const held = verdicts[check]
  if (held === undefined || !cleanly(held)) return false
  return await atOrAfter(root, asked, held.commit)
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

export function verdictRecorded(
  root: string,
  page: string,
  cost: Cost,
  verdict: Verdict,
  under: string
): string | null {
  return recorded(root, page, `${JSON.stringify(loggedOf(cost, verdict))}\n`, under)
}
