import { resolveRoots } from "@akasha/pages/checkout-roots"
import { lowerUuid } from "@akasha/pages/name-format/lower-uuid"
import { fieldFromHistory } from "../seat-page-history/seat-page-history.module.code.ts"
import { pageTextOf } from "../seat-page-values/seat-page-values.module.code.ts"

export const SESSION_KEY = "claude-code-session-uuid"

const KEY = SESSION_KEY

export interface SessionRecord {
  readonly value: string
}

export function sessionOf(agent: string): SessionRecord | null {
  const held = pageTextOf(agent, KEY)
  if (held !== null && lowerUuid(held.toLowerCase())) return { value: held }
  const committed = fieldFromHistory(agent, resolveRoots(), KEY)
  return committed !== null && lowerUuid(committed.toLowerCase()) ? { value: committed } : null
}

export function keepSession(_agent: string, _value: string, _at?: number): undefined {}

export function sessionRecordOf(value: string | null): SessionRecord | null {
  return value !== null && lowerUuid(value.toLowerCase()) ? { value } : null
}
