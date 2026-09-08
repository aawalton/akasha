import { describe, expect, test } from "bun:test"
import {
  type NamedRoot,
  relativizeToNamedRoot,
  resolveByRootTag,
  resolveUnderRoot,
  toRootRelative,
} from "./image-locator.module.code.ts"

const ROOTS: readonly NamedRoot[] = [
  { tag: "personas", root: "/img/personas" },
  { tag: "generated", root: "/img/generated" },
]

describe("toRootRelative", () => {
  test("cuts the root off the front", () => {
    expect(toRootRelative("/img/personas/aria/a.png", "/img/personas")).toBe("aria/a.png")
  })

  test("reads the root itself as nothing left over", () => {
    expect(toRootRelative("/img/personas", "/img/personas")).toBe("")
  })

  test("answers nothing for a path outside the root", () => {
    expect(toRootRelative("/elsewhere/a.png", "/img/personas")).toBeNull()
  })

  test("reads a root written with a trailing slash the same way", () => {
    expect(toRootRelative("/img/personas/a.png", "/img/personas/")).toBe("a.png")
  })
})

describe("resolveUnderRoot", () => {
  test("puts a stored path back under its root", () => {
    expect(resolveUnderRoot("aria/a.png", "/img/personas")).toBe("/img/personas/aria/a.png")
  })

  test("answers a path already absolute unchanged", () => {
    expect(resolveUnderRoot("/somewhere/a.png", "/img/personas")).toBe("/somewhere/a.png")
  })

  test("answers the root itself for an empty stored path", () => {
    expect(resolveUnderRoot("", "/img/personas/")).toBe("/img/personas")
  })
})

describe("relativizeToNamedRoot", () => {
  test("names the root a path sits under", () => {
    expect(relativizeToNamedRoot("/img/generated/x.png", ROOTS)).toEqual({
      tag: "generated",
      relative: "x.png",
    })
  })

  test("answers nothing for a path under none of the roots", () => {
    expect(relativizeToNamedRoot("/elsewhere/x.png", ROOTS)).toBeNull()
  })
})

describe("resolveByRootTag", () => {
  test("resolves under the root its tag names", () => {
    expect(resolveByRootTag("x.png", "generated", ROOTS)).toBe("/img/generated/x.png")
  })

  test("falls back to the first root where the tag names none", () => {
    expect(resolveByRootTag("x.png", "nowhere", ROOTS)).toBe("/img/personas/x.png")
  })

  test("falls back to the first root where no tag is given", () => {
    expect(resolveByRootTag("x.png", undefined, ROOTS)).toBe("/img/personas/x.png")
  })

  test("answers a path already absolute unchanged", () => {
    expect(resolveByRootTag("/somewhere/x.png", "generated", ROOTS)).toBe("/somewhere/x.png")
  })

  test("answers the stored path where there are no roots at all", () => {
    expect(resolveByRootTag("x.png", "generated", [])).toBe("x.png")
  })
})
