export interface ParsedSender {
  readonly address: string
  readonly domain: string
}

function extractAngle(raw: string): string | undefined {
  const opened = raw.indexOf("<")
  if (opened < 0) return undefined
  const closed = raw.indexOf(">", opened + 1)
  if (closed < 0) return undefined
  const inner = raw.slice(opened + 1, closed)
  return inner.length > 0 ? inner : undefined
}

export function parseSender(from: string): ParsedSender {
  const trimmed = from.trim()
  const angled = extractAngle(trimmed)
  const candidate = (angled ?? trimmed).trim().toLowerCase()
  const at = candidate.lastIndexOf("@")
  if (at <= 0 || at === candidate.length - 1) return { address: candidate, domain: "" }
  return { address: candidate, domain: candidate.slice(at + 1) }
}
