import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"
import { oneLine } from "akasha/utils/text/one-line/one-line.module.code.ts"

const FRAME_AT = /^\s+at (?:.+ )?\(?(\/[^\s()]+:\d+:\d+)\)?$/

export function whyOf(thrown: unknown): string {
  return oneLine(saidBy(thrown))
}

export function framesOf(thrown: unknown, atMost: number): readonly string[] {
  const stack = thrown instanceof Error ? thrown.stack : undefined
  if (typeof stack !== "string") return []
  const found: string[] = []
  for (const line of stack.split("\n")) {
    if (found.length >= atMost) break
    const at = FRAME_AT.exec(line)
    const held = at === null ? undefined : at[1]
    if (held !== undefined) found.push(held)
  }
  return found
}
