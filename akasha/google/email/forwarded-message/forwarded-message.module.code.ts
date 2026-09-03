import { randomUUID } from "node:crypto"

const CRLF = "\r\n"
const BLANK_LINE = /\r?\n\r?\n/
const CARRIED = ["Content-Type", "Content-Transfer-Encoding"] as const
const BASE64_LINE = /.{1,76}/g

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

function base64Part(text: string): readonly string[] {
  return [
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    ...(Buffer.from(text, "utf8").toString("base64").match(BASE64_LINE) ?? [""]),
  ]
}

export function forwardOf(original: Buffer, to: string, attribution: Attribution): Buffer {
  const raw = original.toString("latin1")
  const split = BLANK_LINE.exec(raw)
  const lines = unfolded(split === null ? raw : raw.slice(0, split.index))
  const body =
    split === null ? "" : raw.slice(split.index + split[0].length).replace(/(\r?\n)+$/, "")

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
