import { expect, test } from "bun:test"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  answeredApart,
  answeredRead,
  UNPARSED,
} from "akasha/page/service/modules/read-answering/read-answering.module.code.ts"

const ROOT = rootOf(import.meta.dir)

function rowsIn(body: string | Uint8Array): readonly Record<string, unknown>[] {
  const text = typeof body === "string" ? body : new TextDecoder().decode(body)
  return (JSON.parse(text) as { rows: readonly Record<string, unknown>[] }).rows
}

test("a question is answered as JSON with its rows", () => {
  const answer = answeredRead(ROOT, "ask", { pageTypeSlug: "decision-kind", keys: ["slug"] }, null)
  expect(answer.status).toBe(200)
  expect(answer.type).toBe("application/json")
  expect(rowsIn(answer.body).map((one) => one.slug)).toContain("departure")
})

test("a shape naming no page type is refused as the caller's fault", () => {
  const answer = answeredRead(ROOT, "shape", {}, null)
  expect(answer.status).toBe(400)
})

test("a file naming no key is refused as the caller's fault", () => {
  const answer = answeredRead(ROOT, "file", { pageTypeSlug: "module", slug: "page-serving" }, null)
  expect(answer.status).toBe(400)
})

test("a body that will not parse is refused before anything is read", async () => {
  const answer = await answeredApart(ROOT, { id: 0, kind: "ask", text: "not json", asker: null })
  expect(answer.status).toBe(400)
  expect(JSON.parse(String(answer.body))).toEqual({ refused: UNPARSED })
})

test("a question settled apart from landings is answered as it would be at once", async () => {
  const text = JSON.stringify({ pageTypeSlug: "decision-kind", keys: ["slug"] })
  const answer = await answeredApart(ROOT, { id: 1, kind: "ask", text, asker: null })
  expect(answer.status).toBe(200)
  expect(rowsIn(answer.body).map((one) => one.slug)).toContain("departure")
})
