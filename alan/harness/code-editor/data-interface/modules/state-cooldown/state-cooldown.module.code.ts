export type Held = {
  readonly writtenAt: number | null
  readonly written: string | null
  readonly waiting: string | null
}

type Decision =
  | { readonly act: "write"; readonly line: string }
  | { readonly act: "hold"; readonly untilMs: number }
  | { readonly act: "rest" }

export const NOTHING_WRITTEN: Held = { writtenAt: null, written: null, waiting: null }

export function decide(held: Held, line: string, now: number, cooldownMs: number): Decision {
  if (line === held.written) return { act: "rest" }
  if (held.writtenAt === null) return { act: "write", line }
  const ready = held.writtenAt + cooldownMs
  if (now >= ready) return { act: "write", line }
  return { act: "hold", untilMs: ready }
}

export function heldAfter(held: Held, decision: Decision, line: string, now: number): Held {
  if (decision.act === "write") return { writtenAt: now, written: line, waiting: null }
  if (decision.act === "hold") return { ...held, waiting: line }
  return { ...held, waiting: null }
}
