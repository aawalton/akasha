const MAX_CODE_POINT = 0x10ffff

export function decodeSourceEscapes(text: string): string {
  return text.replace(
    /\\(?:\r\n|u\{([0-9a-fA-F]{1,6})\}|u([0-9a-fA-F]{4})|x([0-9a-fA-F]{2})|([\s\S]))/g,
    (whole: string, braced?: string, u4?: string, x2?: string, plain?: string): string => {
      if (whole === "\\\r\n") return ""
      if (braced !== undefined) {
        const code = Number.parseInt(braced, 16)
        return code <= MAX_CODE_POINT ? String.fromCodePoint(code) : ""
      }
      if (u4 !== undefined) return String.fromCharCode(Number.parseInt(u4, 16))
      if (x2 !== undefined) return String.fromCharCode(Number.parseInt(x2, 16))
      switch (plain) {
        case "n":
          return "\n"
        case "t":
          return "\t"
        case "r":
          return "\r"
        case "b":
          return "\b"
        case "f":
          return "\f"
        case "v":
          return "\v"
        case "0":
          return "\0"
        case "\n":
        case "\r":
        case "\u2028":
        case "\u2029":
          return ""
        default:
          return plain ?? ""
      }
    }
  )
}

export function mayHoldNeedle(text: string, needles: readonly string[]): boolean {
  for (const needle of needles) if (text.includes(needle)) return true
  if (!text.includes("\\")) return false
  const decoded = decodeSourceEscapes(text)
  for (const needle of needles) if (decoded.includes(needle)) return true
  return false
}

export function mayHoldPattern(text: string, pattern: RegExp): boolean {
  if (pattern.global)
    throw new Error(
      `mayHoldPattern: ${String(pattern)} carries the global flag, so it holds lastIndex`
    )
  if (pattern.test(text)) return true
  if (!text.includes("\\")) return false
  return pattern.test(decodeSourceEscapes(text))
}
