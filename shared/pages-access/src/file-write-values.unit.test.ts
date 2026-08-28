import { afterEach, expect, test } from "bun:test"
import { forgetAskedShapes } from "./file-property-defs.ts"
import { valuesToWrite } from "./file-write-values.ts"

const SETTLER = "fixture-declares-user-id"
const PLAIN = "fixture-declares-note"
const CAMEL = "fixture-declares-camel"
const KEBAB = "fixture-declares-kebab"

function shapeOf(slug: string): unknown {
  const named = (key: string, pageId: string) => [{ key, type: "text", title: key, pageId, on: slug }]
  const declarations =
    slug === SETTLER
      ? named("userId", "d1")
      : slug === CAMEL
        ? named("mayBeGone", "d3")
        : slug === KEBAB
          ? named("may-be-gone", "d4")
          : named("note", "d2")
  return {
    pageType: slug,
    pageTypeId: "019f0000-0000-7000-9000-000000000001",
    ownerSlug: null,
    declarations,
  }
}

const SHAPE_PATH = /^\/shape\/(.+)$/

let held: typeof globalThis.fetch | null = null

function serve(): undefined {
  held = globalThis.fetch
  forgetAskedShapes()
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const found = SHAPE_PATH.exec(new URL(String(input)).pathname)
    if (found === null) return new Response("{}", { status: 404 })
    return new Response(JSON.stringify(shapeOf(decodeURIComponent(found[1] as string))), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  }) as typeof globalThis.fetch
}

afterEach(() => {
  if (held !== null) globalThis.fetch = held
  held = null
  forgetAskedShapes()
})

test("a settled key the page type declares as its own refuses the write", async () => {
  serve()
  await expect(valuesToWrite("write", SETTLER, { userId: "u9", note: "n" })).rejects.toThrow(
    /userId/
  )
})

test("a settled key the page type does not declare is still dropped", async () => {
  serve()
  expect(await valuesToWrite("write", PLAIN, { userId: "u9", note: "n" })).toEqual({ note: "n" })
})

test("a key its page type declares in lower camel is written under that spelling", async () => {
  serve()
  expect(await valuesToWrite("write", CAMEL, { mayBeGone: true })).toEqual({ mayBeGone: true })
})

test("a key its page type declares in lower kebab is written in kebab, whichever spelling the caller handed over", async () => {
  serve()
  expect(await valuesToWrite("write", KEBAB, { mayBeGone: true })).toEqual({ "may-be-gone": true })
})

test("a key no page type declares falls back to kebab, which is what every page holds today", async () => {
  serve()
  expect(await valuesToWrite("write", PLAIN, { mayBeGone: true })).toEqual({ "may-be-gone": true })
})
