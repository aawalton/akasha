import { describe, expect, test } from "bun:test"
import {
  PropertyDefinitionParseError,
  parsePropertyDefinitionCreate,
  parsePropertyDefinitionUpdate,
} from "./property-definition"

const PAGE_TYPE = "00000000-0000-0000-0000-000000000000"

function catchPropertyDefinitionParseError(fn: () => unknown): PropertyDefinitionParseError {
  try {
    fn()
  } catch (err) {
    expect(err).toBeInstanceOf(PropertyDefinitionParseError)
    if (err instanceof PropertyDefinitionParseError) return err
    throw err
  }
  throw new Error("expected fn to throw PropertyDefinitionParseError but it returned normally")
}

describe("parsePropertyDefinitionCreate — happy path", () => {
  test("title + pageType + type → derives stringId via camelCase", () => {
    const result = parsePropertyDefinitionCreate({
      pageType: PAGE_TYPE,
      title: "Status Code",
      type: "select",
    })
    expect(result).toMatchObject({
      pageType: PAGE_TYPE,
      title: "Status Code",
      type: "select",
      stringId: "statusCode",
    })
  })

  test("explicit stringId wins over derivation from title", () => {
    const result = parsePropertyDefinitionCreate({
      pageType: PAGE_TYPE,
      title: "Status Code",
      type: "text",
      stringId: "explicit",
    })
    expect(result.stringId).toBe("explicit")
  })

  test("stringId-only (no title) is accepted", () => {
    const result = parsePropertyDefinitionCreate({
      pageType: PAGE_TYPE,
      type: "text",
      stringId: "myField",
    })
    expect(result.stringId).toBe("myField")
  })
})

describe("parsePropertyDefinitionCreate — storage tier", () => {
  for (const storage of ["indexed", "content", "external"] as const) {
    test(`accepts storage: '${storage}'`, () => {
      const result = parsePropertyDefinitionCreate({
        pageType: PAGE_TYPE,
        title: "Body",
        type: "text",
        storage,
      })
      expect(result.storage).toBe(storage)
    })
  }

  test("omitted storage → absent (defaults to indexed downstream)", () => {
    const result = parsePropertyDefinitionCreate({
      pageType: PAGE_TYPE,
      title: "Body",
      type: "text",
    })
    expect(result.storage).toBeUndefined()
  })

  test("an unknown storage value is rejected", () => {
    catchPropertyDefinitionParseError(() =>
      parsePropertyDefinitionCreate({
        pageType: PAGE_TYPE,
        title: "Body",
        type: "text",
        storage: "cold",
      })
    )
  })
})

describe("property-definition groupable override", () => {
  for (const groupable of [true, false] as const) {
    test(`create accepts + round-trips groupable: ${groupable}`, () => {
      const result = parsePropertyDefinitionCreate({
        pageType: PAGE_TYPE,
        title: "Priority",
        type: "number",
        groupable,
      })
      expect(result.groupable).toBe(groupable)
    })
  }

  test("omitted groupable → absent (inherits the per-type default downstream)", () => {
    const result = parsePropertyDefinitionCreate({
      pageType: PAGE_TYPE,
      title: "Priority",
      type: "number",
    })
    expect(result.groupable).toBeUndefined()
  })

  test("a non-boolean groupable value is rejected", () => {
    catchPropertyDefinitionParseError(() =>
      parsePropertyDefinitionCreate({
        pageType: PAGE_TYPE,
        title: "Priority",
        type: "number",
        groupable: "yes",
      })
    )
  })

  test("update accepts + round-trips groupable", () => {
    const result = parsePropertyDefinitionUpdate({ groupable: true })
    expect(result.groupable).toBe(true)
  })
})

describe("parsePropertyDefinitionCreate — camelCase derivation", () => {
  const cases: Array<[string, string]> = [
    ["Status Code", "statusCode"],
    ["Foo BarBaz", "fooBarBaz"],
    ["already-camel", "alreadyCamel"],
    ["with 123 numbers", "with123Numbers"],
    ["Single", "single"],
  ]

  for (const [title, expected] of cases) {
    test(`"${title}" → "${expected}"`, () => {
      const result = parsePropertyDefinitionCreate({
        pageType: PAGE_TYPE,
        title,
        type: "text",
      })
      expect(result.stringId).toBe(expected)
    })
  }
})

describe("parsePropertyDefinitionCreate — required fields", () => {
  test("missing pageType → throws with field: pageType", () => {
    const e = catchPropertyDefinitionParseError(() =>
      parsePropertyDefinitionCreate({ title: "T", type: "text" })
    )
    expect(e.field).toBe("pageType")
  })

  test("missing type → throws with field: type", () => {
    const e = catchPropertyDefinitionParseError(() =>
      parsePropertyDefinitionCreate({ pageType: PAGE_TYPE, title: "T" })
    )
    expect(e.field).toBe("type")
  })

  test("missing both title and stringId → throws naming one of them", () => {
    const e = catchPropertyDefinitionParseError(() =>
      parsePropertyDefinitionCreate({ pageType: PAGE_TYPE, type: "text" })
    )
    expect(`${e.field} ${e.message}`.toLowerCase()).toMatch(/title|stringid/)
  })
})

describe("parsePropertyDefinitionCreate — type validation", () => {
  test("invalid type → throws with field: type, message naming offender", () => {
    const e = catchPropertyDefinitionParseError(() =>
      parsePropertyDefinitionCreate({
        pageType: PAGE_TYPE,
        title: "T",
        type: "bogus",
      })
    )
    expect(e.field).toBe("type")
    expect(e.message).toContain("bogus")
  })

  const validTypes = [
    "text",
    "markdown",
    "number",
    "select",
    "multi-select",
    "calendar-date",
    "calendar-time",
    "instant",
    "boolean",
    "url",
    "relation",
    "multi-relation",
    "rollup",
    "aggregate",
    "formula",
    "json",
    "rrule",
  ] as const

  for (const t of validTypes) {
    test(`accepts type="${t}"`, () => {
      const result = parsePropertyDefinitionCreate({
        pageType: PAGE_TYPE,
        title: "T",
        type: t,
      })
      expect(result.type).toBe(t)
    })
  }
})

describe("parsePropertyDefinitionCreate — legacy propertyType rejection", () => {
  test("propertyType present → throws with field: propertyType, message naming `type`", () => {
    const e = catchPropertyDefinitionParseError(() =>
      parsePropertyDefinitionCreate({
        pageType: PAGE_TYPE,
        title: "T",
        propertyType: "text",
      })
    )
    expect(e.field).toBe("propertyType")
    expect(e.message).toContain("type")
  })

  test("propertyType + type both present → still rejected (rename hint)", () => {
    const e = catchPropertyDefinitionParseError(() =>
      parsePropertyDefinitionCreate({
        pageType: PAGE_TYPE,
        title: "T",
        propertyType: "text",
        type: "text",
      })
    )
    expect(e.field).toBe("propertyType")
  })
})

describe("parsePropertyDefinitionCreate — optional pass-through fields", () => {
  test("preserves config, accent, display, defaultOrder, inherited, columnName, indexName, skipRelationMirroring, isRequired, sort", () => {
    const result = parsePropertyDefinitionCreate({
      pageType: PAGE_TYPE,
      title: "Status",
      type: "select",
      config: { options: [{ id: "x", label: "X" }] },
      accent: true,
      display: "inline",
      defaultOrder: 5,
      inherited: false,
      columnName: "status",
      indexName: "by_status",
      skipRelationMirroring: false,
      isRequired: true,
      sort: "manual",
    })
    expect(result).toMatchObject({
      config: { options: [{ id: "x", label: "X" }] },
      accent: true,
      display: "inline",
      defaultOrder: 5,
      inherited: false,
      columnName: "status",
      indexName: "by_status",
      skipRelationMirroring: false,
      isRequired: true,
      sort: "manual",
    })
  })

  test("rejects an unrecognized display value", () => {
    const e = catchPropertyDefinitionParseError(() =>
      parsePropertyDefinitionCreate({
        pageType: PAGE_TYPE,
        title: "Status",
        type: "select",
        display: "chip",
      })
    )
    expect(e.field).toBe("display")
  })
})

describe("parsePropertyDefinitionUpdate — all fields optional", () => {
  test("empty object parses without error", () => {
    const result = parsePropertyDefinitionUpdate({})
    expect(result).toEqual({})
  })

  test("title-only parses", () => {
    const result = parsePropertyDefinitionUpdate({ title: "Renamed" })
    expect(result.title).toBe("Renamed")
  })

  test("type-only (valid) parses", () => {
    const result = parsePropertyDefinitionUpdate({ type: "markdown" })
    expect(result.type).toBe("markdown")
  })
})

describe("parsePropertyDefinitionUpdate — type validation when present", () => {
  test("invalid type → throws with field: type, message naming offender", () => {
    const e = catchPropertyDefinitionParseError(() =>
      parsePropertyDefinitionUpdate({ type: "bogus" })
    )
    expect(e.field).toBe("type")
    expect(e.message).toContain("bogus")
  })
})

describe("parsePropertyDefinitionUpdate — legacy propertyType rejection", () => {
  test("propertyType present → throws with field: propertyType, message naming `type`", () => {
    const e = catchPropertyDefinitionParseError(() =>
      parsePropertyDefinitionUpdate({ propertyType: "text" })
    )
    expect(e.field).toBe("propertyType")
    expect(e.message).toContain("type")
  })
})
