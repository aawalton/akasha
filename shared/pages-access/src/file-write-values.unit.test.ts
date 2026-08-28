import { afterEach, expect, test } from "bun:test"
import { forgetAskedShapes } from "./file-property-defs.ts"
import { valuesToWrite } from "./file-write-values.ts"

const SETTLER = "fixture-declares-user-id"
const PLAIN = "fixture-declares-note"

function shapeOf(slug: string): unknown {
  const declarations =
    slug === SETTLER
      ? [{ key: "userId", type: "text", title: "userId", pageId: "d1", on: slug }]
      : [{ key: "note", type: "text", title: "note", pageId: "d2", on: slug }]
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
