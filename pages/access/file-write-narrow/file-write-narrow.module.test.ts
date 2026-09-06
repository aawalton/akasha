import { describe, expect, test } from "bun:test"
import { loweredFrom, narrowedFrom } from "./file-write-narrow.module.code.ts"

describe("a narrow is lowered whole or it refuses", () => {
  test("eq lowers to `is`", () => {
    expect(loweredFrom({ key: "title", eq: "one" })).toEqual({
      key: "title",
      test: { is: "one" },
    })
  })

  test("a number is lowered as its text, because a test carries text", () => {
    expect(loweredFrom({ key: "seq", eq: 3 })).toEqual({ key: "seq", test: { is: "3" } })
  })

  test("in lowers to `in`", () => {
    expect(loweredFrom({ key: "slug", in: ["a", "b"] })).toEqual({
      key: "slug",
      test: { in: ["a", "b"] },
    })
  })

  test("an `or` refuses rather than widening the write", () => {
    const held = loweredFrom({ or: [{ key: "a", eq: "1" }] })
    expect("refused" in held).toBe(true)
  })

  test("notContains refuses, the service running no such test", () => {
    const held = loweredFrom({ key: "a", notContains: "x" })
    expect("refused" in held).toBe(true)
  })

  // THE CONDITION THAT MUST NEVER VANISH. `userId` is the key the old road stripped, which
  // widened a scoped write to every account's pages. Here it is carried through as an ordinary
  // test, and the service refuses it where the page type declares no such property.
  test("a userId condition is carried rather than stripped", () => {
    const held = narrowedFrom([{ key: "userId", eq: "u-1" }])
    expect(held).toEqual({ where: { userId: { is: "u-1" } } })
  })

  test("two conditions on one key are carried together", () => {
    expect(
      narrowedFrom([
        { key: "a", eq: "1" },
        { key: "b", in: ["x"] },
      ])
    ).toEqual({
      where: { a: { is: "1" }, b: { in: ["x"] } },
    })
  })

  test("one key tested twice the same way refuses", () => {
    const held = narrowedFrom([
      { key: "a", eq: "1" },
      { key: "a", eq: "2" },
    ])
    expect("refused" in held).toBe(true)
  })
})
