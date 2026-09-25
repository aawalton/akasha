import { expect, test } from "bun:test"
import {
  buildLabelModification,
  labelledSaid,
  type RawMessageClient,
  rawMessageBytes,
  sendRaw,
  sentSaid,
  trashedSaid,
} from "akasha/alan/google/email/modules/gmail-messages/gmail-messages.module.code.ts"

function standIn(answer: Readonly<Record<string, unknown>>): {
  readonly client: RawMessageClient
  readonly asked: unknown[]
} {
  const asked: unknown[] = []
  async function answered(params: unknown): Promise<{ readonly data: never }> {
    asked.push(params)
    return { data: answer as never }
  }
  return {
    client: { raw: { users: { messages: { get: answered, send: answered } } } },
    asked,
  }
}

test("raw bytes are the message gmail holds, byte for byte", async () => {
  const bytes = Buffer.from([0, 1, 2, 250, 251, 252, 253, 254, 255])
  const { client, asked } = standIn({ raw: bytes.toString("base64url") })

  expect(await rawMessageBytes(client, "m1")).toEqual(bytes)
  expect(asked).toEqual([{ userId: "me", id: "m1", format: "raw" }])
})

test("a raw send hands gmail the bytes unchanged", async () => {
  const bytes = Buffer.from("From: a@example.com\r\nSubject: ÿ\r\n\r\nbody", "utf-8")
  const { client, asked } = standIn({ id: "s1", threadId: "t1" })

  expect(await sendRaw(client, bytes)).toEqual({ id: "s1", threadId: "t1" })
  const sent = (asked[0] as { requestBody: { raw: string } }).requestBody.raw
  expect(Buffer.from(sent, "base64url")).toEqual(bytes)
  expect(sent).not.toContain("=")
})

test("a relabelling that adds and removes nothing is refused", () => {
  expect(() => buildLabelModification({})).toThrow("at least one")
})

test("a message gmail sent names everyone it went to", () => {
  const said = sentSaid(["one@example.com", "two@example.com"])

  expect(said).toContain("one@example.com, two@example.com")
  expect(said).toContain("cannot be undone")
})

test("a relabelling gmail took names the message", () => {
  expect(labelledSaid("abc123")).toContain("abc123")
})

test("a message gmail trashed names the message", () => {
  expect(trashedSaid("abc123")).toContain("abc123")
})
