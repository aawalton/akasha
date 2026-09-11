const ASSISTANT = "assistant"

const SIDECHAIN = "isSidechain"

const MESSAGE = "message"

const CONTENT = "content"

const TYPE = "type"

const TEXT = "text"

type Held = Record<string, unknown>

function heldIn(line: string): Held | null {
  if (line.trim() === "") return null
  let parsed: unknown
  try {
    parsed = JSON.parse(line)
  } catch {
    return null
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return null
  return parsed as Held
}

function wordsIn(held: Held): string | null {
  if (held[TYPE] !== ASSISTANT) return null
  if (held[SIDECHAIN] === true) return null
  const message = held[MESSAGE]
  if (message === null || typeof message !== "object" || Array.isArray(message)) return null
  const content = (message as Held)[CONTENT]
  if (!Array.isArray(content)) return null
  const said: string[] = []
  for (const one of content) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const block = one as Held
    if (block[TYPE] !== TEXT) continue
    const text = block[TEXT]
    if (typeof text === "string" && text.trim() !== "") said.push(text)
  }
  return said.length === 0 ? null : said.join("\n")
}

export function lastSaidIn(tail: string): string | null {
  const lines = tail.split("\n")
  for (let at = lines.length - 1; at >= 0; at -= 1) {
    const held = heldIn(lines[at] ?? "")
    if (held === null) continue
    const said = wordsIn(held)
    if (said !== null) return said
  }
  return null
}
