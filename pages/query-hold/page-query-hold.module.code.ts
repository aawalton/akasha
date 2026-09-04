import type { Said } from "../query-request/page-query-request.module.code.ts"

let answerTtlMs = 0

interface HeldAnswer {
  readonly at: number
  readonly said: Said
}

const held = new Map<string, HeldAnswer>()

export function holdAnswers(ttlMs: number): void {
  answerTtlMs = ttlMs
}

export function dropAnswers(): void {
  held.clear()
}

export function answerHeldFor(key: string, ask: () => Said): Said {
  if (answerTtlMs === 0) return ask()
  const now = Date.now()
  for (const [named, one] of held) if (now - one.at > answerTtlMs) held.delete(named)
  const one = held.get(key)
  if (one !== undefined) return one.said
  const got = ask()
  held.set(key, { at: now, said: got })
  return got
}
