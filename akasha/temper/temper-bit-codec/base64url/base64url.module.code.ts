import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/tstl-eso-sandbox"

export const BASE64URL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"

export const BASE64URL_DECODE: Record<string, number> = {}
for (let i = 0; i < 64; i++) {
  BASE64URL_DECODE[BASE64URL_CHARS.charAt(i)] = i
}

export function base64urlToBytes(str: string): readonly number[] {
  const bytes: number[] = []
  const len = string.len(str)

  let i = 0
  while (i < len) {
    const c0 = BASE64URL_DECODE[str.charAt(i)] ?? 0
    const c1 = BASE64URL_DECODE[str.charAt(i + 1)] ?? 0
    const c2i = i + 2 < len ? BASE64URL_DECODE[str.charAt(i + 2)] : undefined
    const c3i = i + 3 < len ? BASE64URL_DECODE[str.charAt(i + 3)] : undefined

    bytes.push(BitOr(BitLShift(c0, 2), BitRShift(c1, 4)))

    if (c2i === undefined) break

    bytes.push(BitOr(BitLShift(BitAnd(c1, 0x0f), 4), BitRShift(c2i, 2)))

    if (c3i === undefined) break

    bytes.push(BitOr(BitLShift(BitAnd(c2i, 0x03), 6), c3i))

    i += 4
  }

  return bytes
}

export function bytesToBase64url(bytes: readonly number[]): string {
  let result = ""
  const len = bytes.length

  let i = 0
  while (i < len) {
    const b0 = bytes[i] ?? 0
    const b1 = bytes[i + 1]
    const b2 = bytes[i + 2]

    const c0 = BitRShift(b0, 2)
    result += BASE64URL_CHARS.charAt(c0)

    if (b1 === undefined) {
      const c1 = BitLShift(BitAnd(b0, 0x03), 4)
      result += BASE64URL_CHARS.charAt(c1)
      break
    }

    const c1 = BitOr(BitLShift(BitAnd(b0, 0x03), 4), BitRShift(b1, 4))
    result += BASE64URL_CHARS.charAt(c1)

    if (b2 === undefined) {
      const c2 = BitLShift(BitAnd(b1, 0x0f), 2)
      result += BASE64URL_CHARS.charAt(c2)
      break
    }

    const c2 = BitOr(BitLShift(BitAnd(b1, 0x0f), 2), BitRShift(b2, 6))
    result += BASE64URL_CHARS.charAt(c2)

    const c3 = BitAnd(b2, 0x3f)
    result += BASE64URL_CHARS.charAt(c3)

    i += 3
  }

  return result
}
