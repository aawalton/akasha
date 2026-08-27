export interface ParsedSender {
  readonly address: string
  readonly domain: string
}

function extractAngle(s: string): string | undefined {
  const lt = s.indexOf("<")
  if (lt < 0) return undefined
  const gt = s.indexOf(">", lt + 1)
  if (gt < 0) return undefined
  const inner = s.slice(lt + 1, gt)
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
