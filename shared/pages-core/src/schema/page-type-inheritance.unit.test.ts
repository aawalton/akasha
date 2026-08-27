import { describe, expect, it } from "bun:test"
import { resolveDescendantPageTypeIds } from "./page-type-inheritance"

const PAGE = "019ffc57-8120-7000-9a3d-389f48390043"
const DOMAIN = "019db533-f381-738c-ba1f-8088bf231d29"
const PERSONA = "019eb7f9-08cd-722e-8e5e-7c6928dc578d"

const filed = (id: string, slug: string, extendsSlug: string | null) => ({
  _id: id,
  properties: extendsSlug === null ? { slug } : { slug, extendsSlug },
})

describe("resolveDescendantPageTypeIds", () => {
  it("walks the slug edge that file-backed page types actually carry", () => {
    const pageTypes = [
      filed(PAGE, "page", null),
      filed(PERSONA, "persona", "page"),
      filed("derived-child", "persona-wallpaper", "persona"),
      filed(DOMAIN, "domain", null),
    ]
    const ids = resolveDescendantPageTypeIds(pageTypes, PAGE)
    expect(ids).toEqual(new Set([PAGE, PERSONA, "derived-child"]))
  })

  it("reports a leaf whose file states no extends-slug as its own only descendant", () => {
    const pageTypes = [filed(PAGE, "page", null), filed(DOMAIN, "domain", null)]
    expect(resolveDescendantPageTypeIds(pageTypes, PAGE)).toEqual(new Set([PAGE]))
  })

  it("still honours the uuid edge a row-backed page type carries", () => {
    const pageTypes = [
      { _id: PAGE, properties: { slug: "page" } },
      { _id: PERSONA, properties: { slug: "persona", extendsPageTypeId: PAGE } },
    ]
    expect(resolveDescendantPageTypeIds(pageTypes, PAGE)).toEqual(new Set([PAGE, PERSONA]))
  })

  it("prefers the slug edge where a page type states both", () => {
    const pageTypes = [
      filed(PAGE, "page", null),
      filed(DOMAIN, "domain", null),
      {
        _id: PERSONA,
        properties: { slug: "persona", extendsSlug: "page", extendsPageTypeId: DOMAIN },
      },
    ]
    expect(resolveDescendantPageTypeIds(pageTypes, PAGE)).toEqual(new Set([PAGE, PERSONA]))
    expect(resolveDescendantPageTypeIds(pageTypes, DOMAIN)).toEqual(new Set([DOMAIN]))
  })

  it("falls back to the uuid edge where the named extends-slug is not in the roster", () => {
    const pageTypes = [
      { _id: PAGE, properties: { slug: "page" } },
      {
        _id: PERSONA,
        properties: { slug: "persona", extendsSlug: "absent", extendsPageTypeId: PAGE },
      },
    ]
    expect(resolveDescendantPageTypeIds(pageTypes, PAGE)).toEqual(new Set([PAGE, PERSONA]))
  })

  it("terminates on a slug cycle", () => {
    const pageTypes = [
      filed("a", "alpha", "beta"),
      filed("b", "beta", "alpha"),
      filed(PAGE, "page", null),
    ]
    expect(resolveDescendantPageTypeIds(pageTypes, PAGE)).toEqual(new Set([PAGE]))
  })
})
