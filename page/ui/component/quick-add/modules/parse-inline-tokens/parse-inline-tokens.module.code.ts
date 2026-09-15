export interface ParsedInlineTokens {
  readonly cleanTitle: string
  readonly parsedBySigil: Readonly<Record<string, readonly string[]>>
}

export function parseInlineTokens(raw: string, sigils: readonly string[]): ParsedInlineTokens {
  if (sigils.length === 0) {
    return {
      cleanTitle: raw.replace(/\s{2,}/g, " ").trim(),
      parsedBySigil: {},
    }
  }

  let cleanTitle = raw
  const parsedBySigil: Record<string, string[]> = {}
  for (const sigil of sigils) parsedBySigil[sigil] = []

  for (const sigil of sigils) {
    const escaped = sigil.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const pattern = new RegExp(`${escaped}([\\w-]+)`, "g")
    for (const match of raw.matchAll(pattern)) {
      const captured = match[1]
      if (captured === undefined) continue
      const token = captured.toLowerCase()
      const list = parsedBySigil[sigil]
      if (list === undefined) continue
      if (!list.includes(token)) list.push(token)
      cleanTitle = cleanTitle.replace(match[0], "")
    }
  }

  cleanTitle = cleanTitle.replace(/\s{2,}/g, " ").trim()

  return {
    cleanTitle,
    parsedBySigil,
  }
}
