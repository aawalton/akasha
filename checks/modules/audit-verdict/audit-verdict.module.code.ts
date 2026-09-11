import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { runGit } from "akasha/git/answering/git-answering.module.code.ts"

const KEPT = ".local/state/workstation-services/audit-verdicts.json"

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
  const at = verdictsAt(home)
  if (!existsSync(at)) return {}
  try {
    return verdictsIn(JSON.parse(readFileSync(at, "utf8")))
  } catch {
    return {}
  }
}

export function verdictsWrite(home: string, verdicts: Verdicts): undefined {
  const at = verdictsAt(home)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify(verdicts, null, 2)}\n`)
}

export function verdictKept(verdicts: Verdicts, check: string, verdict: Verdict): Verdicts {
  return { ...verdicts, [check]: verdict }
}

export function cleanly(verdict: Verdict): boolean {
  return !verdict.unrun && verdict.refusals.length === 0
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
