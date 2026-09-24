import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { oneLine } from "akasha/text/modules/one-line/one-line.module.code.ts"

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
    const held = firstCapture(FRAME_AT.exec(line))
    if (held !== null) found.push(held)
  }
  return found
}
