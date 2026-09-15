import { describe, expect, it } from "bun:test"
import {
  drawingsIn,
  drawnFor,
  firstDrawing,
} from "akasha/page/ui/component/modules/drawings-found/drawings-found.module.code.ts"

const ENDING = ".property-badge-component.code.tsx"

describe("drawnFor", () => {
  it("names the page type a drawing sits beside", () => {
    expect(drawnFor(`../../a/b/number-property.page-type${ENDING}`, ENDING)).toBe("number-property")
  })

  it("names nothing for a file with another ending", () => {
    expect(drawnFor("../../a/b/number-property.page-type.page-component.code.tsx", ENDING)).toBe(
      null
    )
  })

  it("names nothing where the name opens with a dot", () => {
    expect(drawnFor(`../../a/b/.page-type${ENDING}`, ENDING)).toBe(null)
  })
})

describe("drawingsIn", () => {
  it("keys each drawing on the page type it sits beside", () => {
    const found = drawingsIn(
      {
        [`./one-property.page-type${ENDING}`]: { Drawing: "one" },
        "./two.module.code.tsx": { Drawing: "two" },
      },
      ENDING
    )
    expect([...found]).toEqual([["one-property", "one"]])
  })
})

describe("firstDrawing", () => {
  const found = new Map([
    ["b", "second"],
    ["c", "third"],
  ])

  it("answers the drawing the chain reaches first", () => {
    expect(firstDrawing(found, ["a", "b", "c"])).toBe("second")
  })

  it("answers nothing where the chain reaches none", () => {
    expect(firstDrawing(found, ["a"])).toBe(undefined)
  })

  it("answers nothing where there is no chain", () => {
    expect(firstDrawing(found, undefined)).toBe(undefined)
  })
})
