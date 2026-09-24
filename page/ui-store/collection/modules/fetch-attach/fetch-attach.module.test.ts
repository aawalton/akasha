import { expect, test } from "bun:test"
import { alanwaltonWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-web.web-app.ts"
import { webApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  askingAgain,
  deliveredWithin,
  filePagesPath,
  readAnswerRows,
} from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"

const ONE = {
  id: "01a06577-2613-700d-a041-62a4896e80cc",
  page_type_id: "01a0680e-5e00-7007-a253-4c7d9b1a5108",
  title: "Home",
  icon: "home",
  attributes: { navPlace: 0, app: namedAs(webApp.slug, alanwaltonWeb.slug, null) },
  page_type_slug: "nav",
  unique_key: null,
  status: null,
  completed_at: null,
  slug: "home",
  favorited_at: null,
  last_viewed_at: null,
}

test("a row the answer carries is read", () => {
  const rows = readAnswerRows({ rows: [ONE] })
  expect(rows?.length).toBe(1)
  expect(rows?.[0]?.slug).toBe("home")
})

test("a whole page type is asked for with nothing named", () => {
  expect(filePagesPath("image")).toBe("/api/pages/image")
})

test("pages named by slug are asked for by those slugs", () => {
  expect(filePagesPath("image", [], { by: "slug", values: ["image-one", "image-two"] })).toBe(
    "/api/pages/image?slug=image-one%2Cimage-two"
  )
})

test("carried keys and named pages are asked for together", () => {
  expect(filePagesPath("seat", ["conversation"], { by: "id", values: ["one"] })).toBe(
    "/api/pages/seat?carry=conversation&id=one"
  )
})

test("a whole page type pushed a change to one page asks for that page alone", () => {
  expect(askingAgain("seat", ["conversation"], undefined, ["one"])).toEqual({
    at: "/api/pages/seat?carry=conversation&id=one",
    only: new Set(["one"]),
  })
  expect(askingAgain("seat", [], undefined, undefined)).toEqual({
    at: "/api/pages/seat",
    only: null,
  })
})

test("a shape naming its own pages is read whole whatever the push names", () => {
  expect(askingAgain("seat", [], { by: "slug", values: ["a"] }, ["one"])).toEqual({
    at: "/api/pages/seat?slug=a",
    only: null,
  })
})

test("only the pages asked for can leave the shape", () => {
  const delivered = new Set(["one", "two"])
  expect(deliveredWithin(delivered, null)).toBe(delivered)
  expect(deliveredWithin(delivered, new Set(["two", "three"]))).toEqual(new Set(["two"]))
})

test("an answer holding one row this reader cannot read carries none of them", () => {
  expect(readAnswerRows({ rows: [ONE, { ...ONE, id: "not a uuid" }] })).toBe(null)
})
