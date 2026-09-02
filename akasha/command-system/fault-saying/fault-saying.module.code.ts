const SAID_AT_MOST = 240

const FRAME_AT = /^\s+at (?:.+ )?\(?(\/[^\s()]+:\d+:\d+)\)?$/

export function oneLine(said: string): string {
  const held = said.replace(/\s+/g, " ").trim()
  return held.length <= SAID_AT_MOST ? held : `${held.slice(0, SAID_AT_MOST - 3)}...`
}

export function saidBy(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

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
