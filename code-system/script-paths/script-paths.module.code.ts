const UNDER = '"$AKASHA_ROOT/'

const CLOSING = '"'

export function namedIn(script: string): readonly string[] {
  const found: string[] = []
  for (const line of script.split("\n")) {
    const at = line.indexOf(UNDER)
    if (at < 0) continue
    const said = line.slice(at + UNDER.length)
    if (!said.endsWith(CLOSING)) continue
    found.push(said.slice(0, -CLOSING.length))
  }
  return found
}
