import { expect, test } from "bun:test"
import { type Attribution, forwardOf } from "./forwarded-message.module.code.ts"

const ATTRIBUTION: Attribution = {
  from: "Amy <amy@example.com>",
  subject: "the original subject",
  to: "alan@example.com",
}

const ORIGINAL = Buffer.from(
  [
    "From: Amy <amy@example.com>",
    "To: alan@example.com",
    "Subject: the original subject",
    "Date: Tue, 2 Sep 2026 09:00:00 -0600",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: quoted-printable",
    "",
    "the original body",
  ].join("\r\n"),
  "latin1"
)

function forwarded(original: Buffer = ORIGINAL): string {
  return forwardOf(original, "walton@example.com", ATTRIBUTION).toString("latin1")
}

test("the forward is addressed where it is sent rather than where the original was sent", () => {
  expect(forwarded()).toContain("To: walton@example.com\r\n")
})

test("the forward's subject is the original's under Fwd", () => {
  expect(forwarded()).toContain("Subject: Fwd: the original subject\r\n")
})

test("the original's body is carried into the forward as it was", () => {
  expect(forwarded()).toContain("the original body")
})

test("the original's content headers are carried onto the part holding its body", () => {
  const out = forwarded()
  expect(out).toContain("Content-Transfer-Encoding: quoted-printable\r\n")
  expect(out).toContain("Content-Type: text/plain; charset=utf-8\r\n")
})

test("the attribution names the original's date, sender, subject and recipient", () => {
  const out = forwarded()
  const part = /Content-Transfer-Encoding: base64\r\n\r\n([A-Za-z0-9+/=\r\n]+)\r\n--/.exec(out)
  const decoded = Buffer.from(part?.[1] ?? "", "base64").toString("utf8")
  expect(decoded).toContain("---------- Forwarded message ----------")
  expect(decoded).toContain("From: Amy <amy@example.com>")
  expect(decoded).toContain("Date: Tue, 2 Sep 2026 09:00:00 -0600")
  expect(decoded).toContain("Subject: the original subject")
  expect(decoded).toContain("To: alan@example.com")
})

test("a header folded over two lines is read as the one header it is", () => {
  const folded = Buffer.from(
    ["From: Amy <amy@example.com>", "Subject: a subject", "\tcarried on", "", "body"].join("\r\n"),
    "latin1"
  )
  expect(forwarded(folded)).toContain("Subject: Fwd: a subject\r\n\tcarried on\r\n")
})

test("a boundary the original already holds is minted again", () => {
  const out = forwarded()
  const boundary = /boundary="([^"]+)"/.exec(out)?.[1] ?? ""
  expect(boundary).not.toBe("")
  expect(ORIGINAL.toString("latin1")).not.toContain(boundary)
  expect(out.endsWith(`--${boundary}--\r\n`)).toBe(true)
})

test("an original carrying no blank line forwards with an empty body", () => {
  const headersOnly = Buffer.from("From: Amy <amy@example.com>\r\nSubject: bare", "latin1")
  expect(forwarded(headersOnly)).toContain("Subject: Fwd: bare\r\n")
})
