import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const PAGES = "temper/player/character/stat/temper-stat-case/pages"

const ENDING = ".temper-stat-case.verified-stats.json"

type Held = {
  readonly character?: unknown
  readonly bar?: unknown
  readonly capturedAt?: unknown
}

export function caseKeyOf(bar: string, capturedAt: number): string {
  return `${bar} ${String(capturedAt)}`
}

function heldIn(folder: string, slug: string): Held | null {
  try {
    return JSON.parse(readFileSync(join(folder, slug, `${slug}${ENDING}`), "utf8")) as Held
  } catch {
    return null
  }
}

export function statCasesOf(root: string, character: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const folder = join(root, PAGES)
  for (const slug of readdirSync(folder)) {
    const held = heldIn(folder, slug)
    if (held?.character !== character) continue
    if (typeof held.bar !== "string" || typeof held.capturedAt !== "number") continue
    found.set(caseKeyOf(held.bar, held.capturedAt), slug)
  }
  return found
}
