const SAID_AT_MOST = 240

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
