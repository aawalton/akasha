const NSSTRING = Buffer.from("NSString", "ascii").toString("hex")
const PAYLOAD = "84012b"

function hex(text: string): string {
  return Buffer.from(text, "utf8").toString("hex")
}

function byteLength(text: string): number {
  return Buffer.byteLength(text, "utf8")
}

function pad(byteCount: number): string {
  return "00".repeat(byteCount)
}

export function shortBody(text: string, lead = ""): string {
  const size = byteLength(text)
  return `${lead}${NSSTRING}${PAYLOAD}${size.toString(16).padStart(2, "0")}${hex(text)}`
}

export function mediumBody(text: string): string {
  const size = byteLength(text)
  const lo = size & 0xff
  const hi = (size >> 8) & 0xff
  const le = `${lo.toString(16).padStart(2, "0")}${hi.toString(16).padStart(2, "0")}`
  return `${NSSTRING}${PAYLOAD}81${le}${hex(text)}`
}

export function longBody(text: string): string {
  const size = byteLength(text)
  const le = Array.from({ length: 4 }, (_, i) =>
    ((size >> (i * 8)) & 0xff).toString(16).padStart(2, "0")
  ).join("")
  return `${NSSTRING}${PAYLOAD}82${le}${hex(text)}`
}

export function overrunBody(text: string): string {
  return `${NSSTRING}${PAYLOAD}7f${hex(text)}`
}

export function unknownLengthForm(marker: string, text: string): string {
  return `${NSSTRING}${PAYLOAD}${marker}${hex(text)}`
}

export const ASCII_TEXT = "the quick brown fox"
export const UNICODE_TEXT = "café — naïve ☕ 日本語"
export const LONG_TEXT = "x".repeat(300)

export const UNREADABLE: readonly (readonly [string, string])[] = [
  ["empty", ""],
  ["no class marker", pad(64)],
  ["class marker but no payload marker", `${NSSTRING}${pad(16)}`],
  ["payload marker at the very end", `${NSSTRING}${PAYLOAD}`],
  ["two-byte length truncated", `${NSSTRING}${PAYLOAD}8103`],
  ["four-byte length truncated", `${NSSTRING}${PAYLOAD}820300`],
  ["length reaches past the end", overrunBody("abc")],
  ["length form 0x80", unknownLengthForm("80", ASCII_TEXT)],
  ["length form 0x83", unknownLengthForm("83", ASCII_TEXT)],
  ["length form 0xfe", unknownLengthForm("fe", ASCII_TEXT)],
  ["payload marker stands before the class marker", `${PAYLOAD}05${hex("hello")}${NSSTRING}`],
]

export const READABLE: readonly (readonly [string, string, string])[] = [
  ["one-byte length", shortBody(ASCII_TEXT), ASCII_TEXT],
  ["one-byte length, empty text", shortBody(""), ""],
  ["one-byte length at its ceiling", shortBody("y".repeat(127)), "y".repeat(127)],
  ["one-byte length behind leading bytes", shortBody(ASCII_TEXT, pad(32)), ASCII_TEXT],
  ["one-byte length carrying utf8", shortBody(UNICODE_TEXT), UNICODE_TEXT],
  ["two-byte length", mediumBody(LONG_TEXT), LONG_TEXT],
  ["two-byte length carrying utf8", mediumBody(UNICODE_TEXT), UNICODE_TEXT],
  ["four-byte length", longBody(LONG_TEXT), LONG_TEXT],
  ["four-byte length carrying utf8", longBody(UNICODE_TEXT), UNICODE_TEXT],
]
