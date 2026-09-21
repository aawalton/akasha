import { describe, expect, it } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  getRelationId,
  resolveRelationName,
  resolveRelationPageId,
  resolveRelationVariant,
} from "akasha/page/ui/component/modules/relation-display/relation-display.module.code.ts"

const PAGE_ID = "019dda20-a963-727d-8922-2712d94cd668"
const ADDRESS = namedAs("flower", "blue-rose", null)
const UNREACHED = namedAs("flower", "no-such-flower", null)
const ENTRY = { id: PAGE_ID, title: "Blue Rose", color: "green" as const }
const RESOLVER = {
  resolve: (named: string) => (named === PAGE_ID || named === ADDRESS ? ENTRY : null),
}
const NAMELESS = {
  resolve: (named: string) => (named === ADDRESS ? { id: PAGE_ID, title: "" } : null),
}

describe("resolveRelationName", () => {
  it("names the page an address reaches", () => {
    expect(resolveRelationName(RESOLVER, ADDRESS)).toBe("Blue Rose")
  })

  it("names the page an id reaches", () => {
    expect(resolveRelationName(RESOLVER, PAGE_ID)).toBe("Blue Rose")
  })

  it("names a relation carrying its own title by that title", () => {
    expect(resolveRelationName(RESOLVER, { id: PAGE_ID, title: "Carried" })).toBe("Carried")
  })

  it("names the page from its address where the page that address reaches has no title", () => {
    expect(resolveRelationName(NAMELESS, ADDRESS)).toBe("Blue Rose")
  })

  it("names the page from its address where nothing reaches a page", () => {
    expect(resolveRelationName(RESOLVER, UNREACHED)).toBe("No Such Flower")
  })

  it("answers the value itself where that value holds no slash", () => {
    expect(resolveRelationName(RESOLVER, "019dda20-a963-727d-8922-000000000000")).toBe(
      "019dda20-a963-727d-8922-000000000000"
    )
  })
})

describe("resolveRelationPageId", () => {
  it("answers the id of the page an address reaches", () => {
    expect(resolveRelationPageId(RESOLVER, ADDRESS)).toBe(PAGE_ID)
  })

  it("answers the id itself where the value is already an id", () => {
    expect(resolveRelationPageId(RESOLVER, PAGE_ID)).toBe(PAGE_ID)
  })

  it("answers the value itself where nothing reaches a page", () => {
    expect(resolveRelationPageId(RESOLVER, UNREACHED)).toBe(UNREACHED)
  })

  it("answers the id a relation carrying its own id names", () => {
    expect(resolveRelationPageId(null, { id: PAGE_ID, title: "Blue Rose" })).toBe(PAGE_ID)
  })
})

describe("resolveRelationVariant", () => {
  it("colours a chip from the page an address reaches", () => {
    expect(resolveRelationVariant(RESOLVER, ADDRESS, false)).toBe("green")
  })

  it("falls back to the accent the property asks for", () => {
    expect(resolveRelationVariant(RESOLVER, UNREACHED, true)).toBe("accent")
  })
})

describe("getRelationId", () => {
  it("answers the address a relation value spells", () => {
    expect(getRelationId(ADDRESS)).toBe(ADDRESS)
  })
})
