import { describe, expect, test } from "bun:test"
import { anyTargetCovers, targetCovers } from "./target"

describe("a target with no `*` matches exactly", () => {
  test("covers itself and nothing else", () => {
    expect(targetCovers("ki-book", "ki-book")).toBe(true)
    expect(targetCovers("ki-book", "ki-books")).toBe(false)
    expect(targetCovers("ki-book", "book")).toBe(false)
    expect(targetCovers("ki-book", "")).toBe(false)
  })

  test("a prefix without the `*` is not read as a prefix", () => {
    expect(targetCovers("ki-", "ki-book")).toBe(false)
  })
})

describe("a `*`-suffixed target is the namespace beneath it", () => {
  test("covers the targets standing in that namespace", () => {
    expect(targetCovers("ki-*", "ki-book")).toBe(true)
    expect(targetCovers("ki-*", "ki-collection-template")).toBe(true)
  })

  test("covers a target created long after the row was written", () => {
    expect(targetCovers("ki-*", "ki-caravan")).toBe(true)
  })

  test("does not spill past the prefix it names", () => {
    expect(targetCovers("ki-*", "book")).toBe(false)
    expect(targetCovers("ki-*", "kite")).toBe(false)
    expect(targetCovers("ki-*", "king-of-the-hill")).toBe(false)
    expect(targetCovers("ki-*", "alan-ki-book")).toBe(false)
  })
})

describe("`*` alone covers every target", () => {
  test("covers unrelated targets and one nothing names", () => {
    expect(targetCovers("*", "ki-book")).toBe(true)
    expect(targetCovers("*", "archiveofworlds")).toBe(true)
    expect(targetCovers("*", "a-target-nothing-names")).toBe(true)
  })
})

describe("a set of targets covers what any one of them covers", () => {
  test("finds the covering target wherever it sits in the list", () => {
    const held = ["archiveofworlds", "pages"]
    expect(anyTargetCovers(held, "pages")).toBe(true)
    expect(anyTargetCovers(held, "archiveofworlds")).toBe(true)
    expect(anyTargetCovers(held, "temper")).toBe(false)
  })

  test("an empty set covers nothing, including the wildcard as a lookup", () => {
    expect(anyTargetCovers([], "pages")).toBe(false)
    expect(anyTargetCovers([], "*")).toBe(false)
  })
})
