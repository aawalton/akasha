import { type Key, answerAt, cacheAnswer } from "../cache.ts"
import { type Input, markOf } from "../mark/mark.ts"

export const OUTCOME_KIND = "outcome"

export type Outcome = {
  readonly slug: string
  readonly path: string
  readonly reasons: readonly string[]
}

export function outcomeMarkOf(
  slug: string,
  runtime: string,
  closure: readonly Input[]
): string {
  return markOf(OUTCOME_KIND, slug, runtime, closure)
}

export function outcomeKeyOf(slug: string, mark: string, subject: string): Key {
  return { kind: OUTCOME_KIND, name: slug, mark, subject }
}

export function cachedOutcome(at: string, key: Key, path: string): Outcome | null {
  const held = answerAt(at, key)
  if (held === null || typeof held !== "object") return null
  const reasons = (held as { reasons?: unknown }).reasons
  if (!Array.isArray(reasons)) return null
  if (!reasons.every((one) => typeof one === "string")) return null
  return { slug: key.name, path, reasons }
}

export function cacheOutcome(at: string, key: Key, outcome: Outcome): void {
  cacheAnswer(at, key, { reasons: outcome.reasons })
}
