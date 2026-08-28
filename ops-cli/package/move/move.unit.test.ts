import { describe, expect, test } from "bun:test"
import { nameIn, planForSource } from "./move.command.code.attachment.ts"

describe("nameIn", () => {
  test("it reads the name a manifest states", () => {
    expect(nameIn('{ "name": "@temper/game-items-addon" }')).toBe("@temper/game-items-addon")
  })

  test("a manifest stating no name answers nothing", () => {
    expect(nameIn('{ "private": true }')).toBe(null)
  })

  test("a body that is not JSON answers nothing", () => {
    expect(nameIn("not json")).toBe(null)
  })

  test("a name that is not a string answers nothing", () => {
    expect(nameIn('{ "name": 3 }')).toBe(null)
  })
})

describe("planForSource", () => {
  const PLAN = [
    { name: "@a/one", from: "akasha:packages/a/one", to: "a/one" },
    { name: "@a/two", from: "code-editor:packages/a/two", to: "a/two" },
  ]

  test("only the repository the bodies leave contributes to the table", () => {
    expect(planForSource(PLAN, "akasha")).toEqual([
      { name: "@a/one", from: "packages/a/one", to: "a/one" },
    ])
  })

  test("the repository mark is taken off, the table being read against one root", () => {
    expect(planForSource(PLAN, "code-editor")[0]?.from).toBe("packages/a/two")
  })

  test("a repository the plan never names contributes nothing", () => {
    const plan = [{ name: "@a/one", from: "akasha:packages/a/one", to: "a/one" }]
    expect(planForSource(plan, "code-editor")).toEqual([])
  })

  test("a repository whose name merely begins the same is not matched", () => {
    const plan = [{ name: "@a/one", from: "akasha-probe:packages/a", to: "a/one" }]
    expect(planForSource(plan, "akasha")).toEqual([])
  })
})
