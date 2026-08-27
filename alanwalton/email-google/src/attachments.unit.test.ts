import { describe, expect, test } from "bun:test"
import { listAttachments } from "./attachments"
import type { ParsedFullMessage } from "./schema"

function message(payload: ParsedFullMessage["payload"]): ParsedFullMessage {
  return { id: "m1", payload }
}

describe("listAttachments", () => {
  test("finds attachments with filename + attachmentId across a nested tree", () => {
    const msg = message({
      mimeType: "multipart/mixed",
      parts: [
        {
          mimeType: "multipart/alternative",
          parts: [
            { mimeType: "text/plain", body: { data: "aGk=", size: 2 } },
            { mimeType: "text/html", body: { data: "PGI+", size: 3 } },
          ],
        },
        {
          mimeType: "application/pdf",
          filename: "invoice.pdf",
          body: { attachmentId: "att-1", size: 1234 },
        },
        {
          mimeType: "image/png",
          filename: "logo.png",
          body: { attachmentId: "att-2", size: 56 },
        },
      ],
    })
    const refs = listAttachments(msg)
    expect(refs).toEqual([
      { filename: "invoice.pdf", mimeType: "application/pdf", attachmentId: "att-1", size: 1234 },
      { filename: "logo.png", mimeType: "image/png", attachmentId: "att-2", size: 56 },
    ])
  })

  test("ignores text parts (no filename) and inline parts missing attachmentId", () => {
    const msg = message({
      mimeType: "multipart/mixed",
      parts: [
        { mimeType: "text/plain", body: { data: "aGk=" } },
        { mimeType: "image/png", filename: "inline.png", body: { data: "PG4+" } },
        { mimeType: "application/octet-stream", filename: "", body: { attachmentId: "x" } },
      ],
    })
    expect(listAttachments(msg)).toEqual([])
  })

  test("empty / payload-less message → no attachments", () => {
    expect(listAttachments(message(undefined))).toEqual([])
  })

  test("defaults mimeType when the part omits it", () => {
    const msg = message({
      mimeType: "multipart/mixed",
      parts: [{ filename: "data.bin", body: { attachmentId: "a" } }],
    })
    expect(listAttachments(msg)).toEqual([
      {
        filename: "data.bin",
        mimeType: "application/octet-stream",
        attachmentId: "a",
        size: undefined,
      },
    ])
  })
})
