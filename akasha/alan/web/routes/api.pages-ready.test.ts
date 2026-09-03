// The instrument is checked before it is believed: each case below seeds a fault and asserts the
// route goes red for it. A check that cannot be shown going red is not evidence when it is green.
import { expect, test } from "bun:test"
import { pagesReady } from "./api.pages-ready.ts"

// This workspace preloads happy-dom, which replaces `globalThis.Response` with one whose
// `json()` Bun refuses to answer with.
globalThis.Response = (await fetch("data:text/plain,")).constructor as typeof Response

test("a read that answers a page is green", async () => {
  const answered = await pagesReady(async () => 1)
  expect(answered.status).toBe(200)
  expect(await answered.json()).toMatchObject({ ready: true, rows: 1 })
})

test("a read that answers no page is red, not green", async () => {
  const answered = await pagesReady(async () => 0)
  expect(answered.status).toBe(503)
  const said = (await answered.json()) as { ready: boolean; why: string }
  expect(said.ready).toBe(false)
  expect(said.why).toContain("answered no page")
})

test("a read that raises is red and names what raised", async () => {
  const answered = await pagesReady(async () => {
    throw new Error("shapeAsked(page-type): there is no shape to read")
  })
  expect(answered.status).toBe(503)
  const said = (await answered.json()) as { ready: boolean; why: string }
  expect(said.ready).toBe(false)
  expect(said.why).toContain("shapeAsked(page-type)")
})

test("a refusal that raises no Error is still red", async () => {
  const answered = await pagesReady(async () => {
    throw "the pages did not answer"
  })
  expect(answered.status).toBe(503)
  expect((await answered.json()) as { ready: boolean }).toMatchObject({ ready: false })
})

test("no answer carries a page's content", async () => {
  for (const read of [async () => 1, async () => 0] as const) {
    const body = await (await pagesReady(read)).text()
    for (const key of ["title", "attributes", 'slug":', "cover"]) {
      expect(body).not.toContain(key)
    }
  }
})
