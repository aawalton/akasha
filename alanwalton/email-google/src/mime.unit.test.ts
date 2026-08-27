import { describe, expect, test } from "bun:test"
import { buildMimeMessage, encodeHeaderText, fromBase64Url, toBase64Url } from "./mime"

describe("buildMimeMessage", () => {
  test("builds a basic to/subject/body message with CRLF headers and a blank separator line", () => {
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "Hello",
      bodyText: "Body text",
    })
    const [headerBlock, body] = message.split("\r\n\r\n")
    expect(body).toBe("Body text")
    const headers = (headerBlock ?? "").split("\r\n")
    expect(headers).toContain("To: a@x.com")
    expect(headers).toContain("Subject: Hello")
    expect(headers).toContain("MIME-Version: 1.0")
    expect(headers).toContain('Content-Type: text/plain; charset="utf-8"')
    expect(message).not.toContain("Cc:")
    expect(message).not.toContain("Bcc:")
    expect(message).not.toContain("In-Reply-To:")
    expect(message).not.toContain("References:")
  })

  test("joins multiple recipients with comma-space across To/Cc/Bcc", () => {
    const message = buildMimeMessage({
      to: ["a@x.com", "b@y.com"],
      cc: ["c@z.com", "d@w.com"],
      bcc: ["e@v.com"],
      subject: "Multi",
      bodyText: "Body",
    })
    expect(message).toContain("To: a@x.com, b@y.com\r\n")
    expect(message).toContain("Cc: c@z.com, d@w.com\r\n")
    expect(message).toContain("Bcc: e@v.com\r\n")
  })

  test("encodes a non-ASCII subject as an RFC 2047 UTF-8 encoded-word", () => {
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "Servus Grüße ☃",
      bodyText: "Body",
    })
    const subjectLine = message.split("\r\n").find((line) => line.startsWith("Subject: "))
    expect(subjectLine).toBeDefined()
    const encoded = (subjectLine ?? "").slice("Subject: ".length)
    expect(encoded.startsWith("=?UTF-8?B?")).toBe(true)
    expect(encoded.endsWith("?=")).toBe(true)
    const base64 = encoded.slice("=?UTF-8?B?".length, -"?=".length)
    expect(Buffer.from(base64, "base64").toString("utf-8")).toBe("Servus Grüße ☃")
  })

  test("leaves a plain-ASCII subject unencoded", () => {
    expect(encodeHeaderText("Plain subject 123")).toBe("Plain subject 123")
  })

  test("omits the From header when no sender identity is provided (default: authed account)", () => {
    const message = buildMimeMessage({ to: ["a@x.com"], subject: "Hi", bodyText: "Body" })
    expect(message).not.toContain("From:")
  })

  test("emits From: Name <email> when a sender identity is provided", () => {
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "Hi",
      bodyText: "Body",
      from: { name: "Amy", email: "amy@alanwalton.com" },
    })
    expect(message).toContain("From: Amy <amy@alanwalton.com>\r\n")
    expect(message.startsWith("From: Amy <amy@alanwalton.com>\r\nTo: a@x.com")).toBe(true)
  })

  test("emits a bare From: <email> when the display name is empty", () => {
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "Hi",
      bodyText: "Body",
      from: { name: "", email: "amy@alanwalton.com" },
    })
    expect(message).toContain("From: amy@alanwalton.com\r\n")
    expect(message).not.toContain("From:  <")
  })

  test("RFC 2047-encodes a non-ASCII From display name", () => {
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "Hi",
      bodyText: "Body",
      from: { name: "Amélie", email: "amy@alanwalton.com" },
    })
    const fromLine = message.split("\r\n").find((line) => line.startsWith("From: "))
    expect(fromLine).toBeDefined()
    expect(fromLine ?? "").toContain("=?UTF-8?B?")
    expect(fromLine ?? "").toContain("<amy@alanwalton.com>")
  })

  test("includes In-Reply-To and References headers when provided", () => {
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "Re: Hello",
      bodyText: "Reply body",
      inReplyTo: "<parent@mail.gmail.com>",
      references: "<root@mail.gmail.com> <parent@mail.gmail.com>",
    })
    expect(message).toContain("In-Reply-To: <parent@mail.gmail.com>\r\n")
    expect(message).toContain("References: <root@mail.gmail.com> <parent@mail.gmail.com>\r\n")
  })
})

describe("buildMimeMessage with attachments", () => {
  const attachment = {
    filename: "notes.txt",
    contentType: "text/plain;charset=utf-8",
    contentBase64: Buffer.from("hello").toString("base64"),
  }

  test("emits multipart/mixed with the supplied boundary and no message-level transfer encoding", () => {
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "With file",
      bodyText: "Body text",
      multipart: { boundary: "temper-abc123", attachments: [attachment] },
    })
    const headerBlock = message.split("\r\n\r\n")[0] ?? ""
    const headers = headerBlock.split("\r\n")
    expect(headers).toContain('Content-Type: multipart/mixed; boundary="temper-abc123"')
    expect(headers).toContain("MIME-Version: 1.0")
    expect(headers).not.toContain("Content-Transfer-Encoding: 8bit")
  })

  test("wraps the body in a text/plain part and closes with the terminal boundary", () => {
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "With file",
      bodyText: "Body text",
      multipart: { boundary: "b1", attachments: [attachment] },
    })
    expect(message).toContain(
      '--b1\r\nContent-Type: text/plain; charset="utf-8"\r\nContent-Transfer-Encoding: 8bit\r\n\r\nBody text\r\n'
    )
    expect(message.endsWith("--b1--\r\n")).toBe(true)
  })

  test("emits one base64 attachment part per attachment, in order", () => {
    const second = {
      filename: "data.csv",
      contentType: "text/csv",
      contentBase64: Buffer.from("a,b\n1,2").toString("base64"),
    }
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "Two files",
      bodyText: "Body",
      multipart: { boundary: "b2", attachments: [attachment, second] },
    })
    expect(message).toContain(
      '--b2\r\nContent-Type: text/plain;charset=utf-8\r\nContent-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename="notes.txt"\r\n\r\naGVsbG8=\r\n'
    )
    expect(message).toContain(
      '--b2\r\nContent-Type: text/csv\r\nContent-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename="data.csv"\r\n\r\n'
    )
    expect(message.indexOf("notes.txt")).toBeLessThan(message.indexOf("data.csv"))
    expect(message.split("\r\n--b2\r\n").length - 1).toBe(3)
  })

  test("wraps base64 payloads at 76 characters per RFC 2045", () => {
    const big = {
      filename: "big.bin",
      contentType: "application/octet-stream",
      contentBase64: Buffer.from("x".repeat(300)).toString("base64"),
    }
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "Big",
      bodyText: "Body",
      multipart: { boundary: "b3", attachments: [big] },
    })
    const part = (message.split("\r\n--b3\r\n")[2] ?? "").replace("\r\n--b3--\r\n", "")
    const payloadLines = (part.split("\r\n\r\n")[1] ?? "").split("\r\n")
    expect(payloadLines.length).toBe(6)
    for (const line of payloadLines) expect(line.length).toBeLessThanOrEqual(76)
    expect(payloadLines.join("")).toBe(big.contentBase64)
  })

  test("escapes quotes and backslashes in an ASCII filename", () => {
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "Odd name",
      bodyText: "Body",
      multipart: {
        boundary: "b4",
        attachments: [{ ...attachment, filename: 'we"ird\\name.txt' }],
      },
    })
    expect(message).toContain(
      'Content-Disposition: attachment; filename="we\\"ird\\\\name.txt"\r\n'
    )
  })

  test("uses RFC 2231 filename* for a non-ASCII filename", () => {
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "Accents",
      bodyText: "Body",
      multipart: { boundary: "b5", attachments: [{ ...attachment, filename: "Grüße ☃.pdf" }] },
    })
    const disposition = message
      .split("\r\n")
      .find((line) => line.startsWith("Content-Disposition: "))
    expect(disposition).toBe(
      "Content-Disposition: attachment; filename*=UTF-8''Gr%C3%BC%C3%9Fe%20%E2%98%83.pdf"
    )
    expect(message).not.toContain('filename="Grüße')
  })

  test("stays a single-part text/plain message when the attachment list is empty", () => {
    const message = buildMimeMessage({
      to: ["a@x.com"],
      subject: "Empty",
      bodyText: "Body",
      multipart: { boundary: "b6", attachments: [] },
    })
    expect(message).toBe(buildMimeMessage({ to: ["a@x.com"], subject: "Empty", bodyText: "Body" }))
  })
})

describe("base64url codec", () => {
  test("round-trips UTF-8 content", () => {
    const original = "héllo wörld ☃ — ünïcode"
    expect(fromBase64Url(toBase64Url(original))).toBe(original)
  })

  test("emits no padding and uses -/_ instead of +//", () => {
    const encoded = toBase64Url(">>>???")
    expect(encoded).toBe("Pj4-Pz8_")
    expect(encoded).not.toContain("=")
    expect(encoded).not.toContain("+")
    expect(encoded).not.toContain("/")
    expect(fromBase64Url(encoded)).toBe(">>>???")
  })
})
