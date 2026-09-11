const ASSISTANT = "assistant"

const USER = "user"

const SIDECHAIN = "isSidechain"

const MESSAGE = "message"

const CONTENT = "content"

const ORIGIN = "origin"

const KIND = "kind"

const HUMAN = "human"

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

function heldAt(held: Held, key: string): Held | null {
  const found = held[key]
  if (found === null || typeof found !== "object" || Array.isArray(found)) return null
  return found as Held
}

function textIn(content: unknown): string | null {
  if (typeof content === "string") return content.trim() === "" ? null : content
  if (!Array.isArray(content)) return null
  const found: string[] = []
  for (const one of content) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const block = one as Held
    if (block[TYPE] !== TEXT) continue
    const text = block[TEXT]
    if (typeof text === "string" && text.trim() !== "") found.push(text)
  }
  return found.length === 0 ? null : found.join("\n")
}

function wordsIn(held: Held): string | null {
  if (held[TYPE] !== ASSISTANT) return null
  if (held[SIDECHAIN] === true) return null
  const message = heldAt(held, MESSAGE)
  if (message === null || !Array.isArray(message[CONTENT])) return null
  return textIn(message[CONTENT])
}

function askingIn(held: Held): string | null {
  if (held[TYPE] !== USER) return null
  if (held[SIDECHAIN] === true) return null
  if (heldAt(held, ORIGIN)?.[KIND] !== HUMAN) return null
  const message = heldAt(held, MESSAGE)
  return message === null ? null : textIn(message[CONTENT])
}

function lastIn(tail: string, found: (held: Held) => string | null): string | null {
  const lines = tail.split("\n")
  for (let at = lines.length - 1; at >= 0; at -= 1) {
    const held = heldIn(lines[at] ?? "")
    if (held === null) continue
    const one = found(held)
    if (one !== null) return one
  }
  return null
}

export function lastSaidIn(tail: string): string | null {
  return lastIn(tail, wordsIn)
}

export function lastAskedIn(tail: string): string | null {
  return lastIn(tail, askingIn)
}
