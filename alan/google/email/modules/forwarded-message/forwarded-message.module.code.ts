import { randomUUID } from "node:crypto"

const CRLF = "\r\n"
const BLANK_LINE = /(\r?\n\r?\n)/
const CARRIED = ["Content-Type", "Content-Transfer-Encoding"] as const
const BASE64_WIDTH = 76

export interface Attribution {
  readonly from: string
  readonly subject: string
  readonly to: string
}

function unfolded(headers: string): readonly string[] {
  const held: string[] = []
  for (const line of headers.split(/\r?\n/)) {
    const previous = held.length - 1
    if (/^[ \t]/.test(line) && previous >= 0) held[previous] = `${held[previous]}${CRLF}${line}`
    else held.push(line)
  }
  return held
}

function headerValue(lines: readonly string[], name: string): string {
  for (const line of lines) {
    const colon = line.indexOf(":")
    if (colon !== -1 && line.slice(0, colon).trim().toLowerCase() === name)
      return line.slice(colon + 1).trim()
  }
  return ""
}

function base64Lines(encoded: string): readonly string[] {
  const lines: string[] = []
  for (let at = 0; at < encoded.length; at += BASE64_WIDTH)
    lines.push(encoded.slice(at, at + BASE64_WIDTH))
  return lines.length === 0 ? [""] : lines
}

function base64Part(text: string): readonly string[] {
  return [
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    ...base64Lines(Buffer.from(text, "utf8").toString("base64")),
  ]
}

export function forwardOf(original: Buffer, to: string, attribution: Attribution): Buffer {
  const raw = original.toString("latin1")
  const [head = raw, separator, ...rest] = raw.split(BLANK_LINE)
  const lines = unfolded(head)
  const body = separator === undefined ? "" : rest.join("").replace(/(\r?\n)+$/, "")

  let boundary = `=_forwarded_${randomUUID()}`
  while (raw.includes(boundary)) boundary = `=_forwarded_${randomUUID()}`

  const attributed = [
    "---------- Forwarded message ----------",
    `From: ${attribution.from}`,
    `Date: ${headerValue(lines, "date")}`,
    `Subject: ${attribution.subject}`,
    `To: ${attribution.to}`,
  ].join("\n")

  return Buffer.from(
    [
      `To: ${to}`,
      `Subject: Fwd: ${headerValue(lines, "subject")}`,
      "MIME-Version: 1.0",
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      ...base64Part(attributed),
      `--${boundary}`,
      ...CARRIED.map((name) => ({ name, value: headerValue(lines, name.toLowerCase()) }))
        .filter((one) => one.value !== "")
        .map((one) => `${one.name}: ${one.value}`),
      "",
      body,
      `--${boundary}--`,
      "",
    ].join(CRLF),
    "latin1"
  )
}
