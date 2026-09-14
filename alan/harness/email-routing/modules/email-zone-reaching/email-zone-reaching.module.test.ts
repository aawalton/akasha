import { expect, test } from "bun:test"
import {
  answeredOf,
  READING_RULES,
  WRITING_RULES,
} from "akasha/alan/harness/email-routing/modules/email-zone-reaching/email-zone-reaching.module.code.ts"

const answering = (body: string, status = 200): Response => new Response(body, { status })

const enveloped = (held: unknown, success = true): string =>
  JSON.stringify({ success, errors: [], result: held })

test("a token refused the write says that rather than saying the call failed", async () => {
  await expect(answeredOf(answering(enveloped(null, false), 403), WRITING_RULES)).rejects.toThrow(
    "the token cannot write routing rules — Cloudflare answered 403"
  )
})

test("a token refused the read says that too", async () => {
  await expect(answeredOf(answering("", 403), READING_RULES)).rejects.toThrow(
    "the token cannot read routing rules"
  )
})

test("a 401 is read as the token being refused rather than as a fault elsewhere", async () => {
  await expect(answeredOf(answering("", 401), WRITING_RULES)).rejects.toThrow(
    "the token cannot write routing rules — Cloudflare answered 401"
  )
})

test("a refusal carrying no JSON still says the token was refused", async () => {
  await expect(answeredOf(answering("<html>no</html>", 403), WRITING_RULES)).rejects.toThrow(
    "the token cannot write routing rules"
  )
})

test("a 200 carrying `success: false` is a refusal rather than an answer", async () => {
  const body = JSON.stringify({ success: false, errors: [{ message: "bad matcher" }] })
  await expect(answeredOf(answering(body), WRITING_RULES)).rejects.toThrow(
    "Cloudflare refused to write routing rules with 200: bad matcher"
  )
})

test("a refusal carrying no `result` is read, because a refusal carries none", async () => {
  const body = JSON.stringify({ success: false, errors: [{ message: "no permission" }] })
  await expect(answeredOf(answering(body, 400), WRITING_RULES)).rejects.toThrow("no permission")
})

test("a refusal naming no reason says so rather than trailing off", async () => {
  const body = JSON.stringify({ success: false, errors: [] })
  await expect(answeredOf(answering(body, 400), READING_RULES)).rejects.toThrow(
    "Cloudflare refused to read routing rules with 400: no reason given"
  )
})

test("every reason a refusal names is carried, rather than only the first", async () => {
  const body = JSON.stringify({ success: false, errors: [{ message: "one" }, { message: "two" }] })
  await expect(answeredOf(answering(body), WRITING_RULES)).rejects.toThrow("one; two")
})

test("a body that is not JSON at all is said as that rather than as a parse of nothing", async () => {
  await expect(answeredOf(answering("not json", 500), READING_RULES)).rejects.toThrow(
    "Cloudflare answered 500 with what is not JSON when asked to read routing rules"
  )
})

test("an answer that succeeded hands back what Cloudflare put under `result`", async () => {
  expect(await answeredOf(answering(enveloped([{ id: "one" }])), READING_RULES)).toEqual([
    { id: "one" },
  ])
})

test("an answer carrying no result hands back nothing rather than throwing", async () => {
  expect(await answeredOf(answering(enveloped(null)), WRITING_RULES)).toBeNull()
})
