import { expect, test } from "bun:test"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  answeredApart,
  answeredRead,
  UNPARSED,
  wideAt,
} from "akasha/page/service/modules/read-answering/read-answering.module.code.ts"
import { apartFor } from "akasha/page/service/modules/read-settling/read-settling.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const PLACED = { root: ROOT, apart: apartFor(1), at: 0 }

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
  const asked = { id: 0, kind: "ask", text: "not json", asker: null } as const
  const answer = await answeredApart(PLACED, asked, undefined)
  expect(answer.status).toBe(400)
  expect(JSON.parse(String(answer.body))).toEqual({ refused: UNPARSED })
})

test("a question kept apart from landings is answered as it would be at once", async () => {
  const body = { pageTypeSlug: "decision-kind", keys: ["slug"] }
  const asked = { id: 1, kind: "ask", text: JSON.stringify(body), asker: null } as const
  const answer = await answeredApart(PLACED, asked, body)
  expect(answer.status).toBe(200)
  expect(rowsIn(answer.body).map((one) => one.slug)).toContain("departure")
  expect([...PLACED.apart]).toEqual([0, 0])
})

test("a question is wide where its page type holds more pages than the most given", () => {
  const body = { pageTypeSlug: "decision-kind" }
  expect(wideAt(ROOT, "ask", body, 2)).toBe(true)
  expect(wideAt(ROOT, "ask", body)).toBe(false)
})

test("only a question naming a page type can be wide", () => {
  expect(wideAt(ROOT, "shape", { pageTypeSlug: "decision-kind" }, 0)).toBe(false)
  expect(wideAt(ROOT, "ask", undefined, 0)).toBe(false)
  expect(wideAt(ROOT, "ask", { pageTypeSlug: "no-such-page-type-anywhere" }, 0)).toBe(false)
})
