import { describe, expect, it } from "bun:test"
import { buildRawPageRows, camelizeKey, coerceByType } from "./file-rows"
import { idDerivedFrom } from "../../../page/name/naming/naming.ts"
import type { PropertyDefinition } from "./page-type-config"

const def = (id: string, type: string): PropertyDefinition => ({
  id,
  title: id,
  type,
  pageId: "019db533-f381-7454-a6e4-fed5397cfd84",
})

const NO_DEFINITIONS: readonly PropertyDefinition[] = []

const ARGS = {
  definitions: NO_DEFINITIONS,
  pageTypeId: "019db533-f381-7454-a6e4-fed5397cfd84",
  pageTypeSlug: "claude-account",
  userId: "alan",
}

describe("camelizeKey — the kebab a file spells onto the key a definition declares", () => {
  it("lowers each hyphen onto the letter after it", () => {
    expect(camelizeKey("five-hour-resets-at")).toBe("fiveHourResetsAt")
  })

  it("leaves a single-segment key alone", () => {
    expect(camelizeKey("owner")).toBe("owner")
  })

  it("carries a digit segment without capitalising nothing", () => {
    expect(camelizeKey("last-429-at")).toBe("last429At")
  })

  it("meets the definition `effective-seven-day-percent-used` is declared under", () => {
    expect(camelizeKey("effective-seven-day-percent-used")).toBe("effectiveSevenDayPercentUsed")
  })

  it("has nothing to say about an empty key", () => {
    expect(camelizeKey("")).toBe("")
  })
})

describe("coerceByType — what the declared type says the file's text meant", () => {
  it("reads a number out of its text", () => {
    expect(coerceByType("62", "number")).toBe(62)
  })

  it("reads a list of numbers as numbers, so a list and a scalar agree on what a number is", () => {
    expect(coerceByType(["62", "7"], "list(number)")).toEqual([62, 7])
    expect(coerceByType("62", "number")).toBe(62)
  })

  it("reads a lone value under a list type as a list of one, coerced the same way", () => {
    expect(coerceByType("62", "list(number)")).toEqual([62])
  })

  it("carries a bound on the list without changing what the items are", () => {
    expect(coerceByType(["62"], "list(number, max 20)")).toEqual([62])
  })

  it("leaves a list of text as text", () => {
    expect(coerceByType(["a", "b"], "list(text)")).toEqual(["a", "b"])
  })

  it("reads a mapping back out of the JSON a file carries it as", () => {
    expect(coerceByType('{"a":"one"}', "map(text)")).toEqual({ a: "one" })
  })

  it("coerces each value of a mapping by the type the map states", () => {
    expect(coerceByType('{"a":"62"}', "map(number)")).toEqual({ a: 62 })
  })

  it("leaves a mapping that is no JSON object as it came, rather than inventing one", () => {
    expect(coerceByType("not-json", "map(text)")).toBe("not-json")
  })

  it("reads a select by the type it selects from", () => {
    expect(coerceByType("62", "select(number)")).toBe(62)
  })

  it("reads a list of selects item by item", () => {
    expect(coerceByType(["62"], "list(select(number), max 4)")).toEqual([62])
  })

  it("leaves text that is no number as it came", () => {
    expect(coerceByType("many", "number")).toBe("many")
  })

  it("reads both flags out of their text", () => {
    expect(coerceByType("true", "boolean")).toBe(true)
    expect(coerceByType("false", "boolean")).toBe(false)
  })

  it("leaves text that is neither flag as it came", () => {
    expect(coerceByType("yes", "boolean")).toBe("yes")
  })

  it("reads a structure out of its text", () => {
    expect(coerceByType('{"rule":"FREQ=DAILY"}', "rrule")).toEqual({ rule: "FREQ=DAILY" })
  })

  it("leaves a structure that will not parse as it came", () => {
    expect(coerceByType("{not json", "json")).toBe("{not json")
  })

  it("keeps a list of text a list", () => {
    expect(coerceByType(["user:inference", "user:profile"], "multi-select")).toEqual([
      "user:inference",
      "user:profile",
    ])
  })

  it("makes a lone value a list where the type is a list", () => {
    expect(coerceByType("user:inference", "multi-relation")).toEqual(["user:inference"])
  })

  it("passes an instant through as the ISO text it came as", () => {
    expect(coerceByType("2026-08-19T17:40:00.463094+00:00", "instant")).toBe(
      "2026-08-19T17:40:00.463094+00:00"
    )
  })

  it("passes every other type through untouched", () => {
    expect(coerceByType("max", "select")).toBe("max")
    expect(coerceByType("https://example.com", "url")).toBe("https://example.com")
  })

  it("reads an absent value as null", () => {
    expect(coerceByType(null, "number")).toBeNull()
    expect(coerceByType(undefined, "text")).toBeNull()
  })
})

describe("buildRawPageRows — one pages row per file the engine answered with", () => {
  it("takes the file's own id as the row's key", () => {
    const [row] = buildRawPageRows({
      ...ARGS,
      rows: [
        {
          at: "fixture:zoo/animals/tiger.md",
          values: { id: "019fa944-c37d-7631-be0b-d2ff83b74635" },
        },
      ],
    })
    expect(row?.id).toBe("019fa944-c37d-7631-be0b-d2ff83b74635")
  })

  it("derives a key from the file alone where the file states no id", () => {
    const [row] = buildRawPageRows({
      ...ARGS,
      rows: [{ at: "fixture:zoo/animals/tiger.md", values: { owner: "alan" } }],
    })
    expect(row?.id).toBe(idDerivedFrom("fixture:zoo/animals/tiger.md"))
  })

  it("lifts the file's title onto the column rather than into attributes", () => {
    const [row] = buildRawPageRows({ ...ARGS, rows: [{ at: "a", values: { title: "Aine" } }] })
    expect(row?.title).toBe("Aine")
    expect(row?.attributes).toEqual({})
  })

  it("leaves no key this route settles in attributes to disagree with its column", () => {
    const [row] = buildRawPageRows({
      ...ARGS,
      rows: [
        {
          at: "a",
          values: {
            "page-type-slug": "elsewhere",
            "user-id": "someone",
            "page-type-id": "00000000-0000-0000-0000-000000000000",
            seq: "9",
            owner: "alan",
          },
        },
      ],
    })
    expect(row?.attributes).toEqual({ owner: "alan" })
    expect(row?.page_type_slug).toBe("claude-account")
    expect(row?.page_type_id).toBe(ARGS.pageTypeId)
    expect(row?.seq).toBe(9)
  })

  it("carries an absent seq as null rather than as a seq no minter issues", () => {
    const [row] = buildRawPageRows({
      ...ARGS,
      rows: [{ at: "a", values: { owner: "alan" } }],
    })
    expect(row?.seq).toBeNull()
  })

  it("lifts every column a file may state onto that column, not into attributes", () => {
    const [row] = buildRawPageRows({
      ...ARGS,
      rows: [
        {
          at: "a",
          values: {
            slug: "aine",
            icon: "star",
            "unique-key": "aine@alanwalton.com",
            status: "open",
            "completed-at": "2026-01-01T00:00:00.000Z",
            "favorited-at": "2026-01-02T00:00:00.000Z",
            "last-viewed-at": "2026-01-03T00:00:00.000Z",
          },
        },
      ],
    })
    expect(row?.slug).toBe("aine")
    expect(row?.icon).toBe("star")
    expect(row?.unique_key).toBe("aine@alanwalton.com")
    expect(row?.status).toBe("open")
    expect(row?.completed_at).toBe("2026-01-01T00:00:00.000Z")
    expect(row?.favorited_at).toBe("2026-01-02T00:00:00.000Z")
    expect(row?.last_viewed_at).toBe("2026-01-03T00:00:00.000Z")
    expect(row?.attributes).toEqual({})
  })

  it("holds a lifted column null where the file states nothing for it", () => {
    const [row] = buildRawPageRows({ ...ARGS, rows: [{ at: "a", values: { owner: "alan" } }] })
    expect(row?.status).toBeNull()
    expect(row?.completed_at).toBeNull()
    expect(row?.slug).toBeNull()
    expect(row?.icon).toBeNull()
    expect(row?.unique_key).toBeNull()
  })

  it("keeps an undeclared key reaching attributes untouched beside the lifted ones", () => {
    const [row] = buildRawPageRows({
      ...ARGS,
      rows: [{ at: "a", values: { status: "open", "five-hour-percent-used": "62" } }],
    })
    expect(row?.status).toBe("open")
    expect(row?.attributes).toEqual({ fiveHourPercentUsed: "62" })
  })

  it("coerces a key the page type declares by that declared type", () => {
    const [row] = buildRawPageRows({
      ...ARGS,
      definitions: [def("aliasIndex", "number"), def("extendedContextAvailable", "boolean")],
      rows: [{ at: "a", values: { "alias-index": "1", "extended-context-available": "true" } }],
    })
    expect(row?.attributes).toEqual({ aliasIndex: 1, extendedContextAvailable: true })
  })

  it("keeps a key the page type declares nothing about, as the text the file states", () => {
    const [row] = buildRawPageRows({
      ...ARGS,
      definitions: [def("aliasIndex", "number")],
      rows: [{ at: "a", values: { "five-hour-percent-used": "62", "alias-index": "1" } }],
    })
    expect(row?.attributes).toEqual({ fiveHourPercentUsed: "62", aliasIndex: 1 })
  })

  it("carries the page type and the reader onto every row", () => {
    const rows = buildRawPageRows({
      ...ARGS,
      rows: [
        { at: "a", values: {} },
        { at: "b", values: {} },
      ],
    })
    expect(rows).toHaveLength(2)
    for (const row of rows) {
      expect(row.page_type_id).toBe(ARGS.pageTypeId)
      expect(row.page_type_slug).toBe("claude-account")
    }
  })

  it("holds seq and both instants still, so a poll that changed nothing churns nothing", () => {
    const once = buildRawPageRows({ ...ARGS, rows: [{ at: "a", values: {} }] })
    const again = buildRawPageRows({ ...ARGS, rows: [{ at: "a", values: {} }] })
    expect(once).toEqual(again)
  })
})
