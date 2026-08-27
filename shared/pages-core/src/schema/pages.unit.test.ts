import { describe, expect, test } from "bun:test"
import { PropertyDefinitionSchema, parseConfig } from "./pages"
import { formulaConfigSchema, numberConfigSchema, selectConfigSchema, textConfigSchema } from "./property-config-schemas"

describe("parseConfig", () => {
  test("valid input returns parsed value with format default applied", () => {
    const result = parseConfig(numberConfigSchema, { min: 0, max: 100 }, {})
    expect(result).toEqual({ min: 0, max: 100, format: "number" })
  })

  test("undefined raw materializes the format default from the schema", () => {
    const result = parseConfig(numberConfigSchema, undefined, { format: "number" })
    expect(result).toEqual({ format: "number" })
  })

  test("null raw materializes the format default from the schema", () => {
    const result = parseConfig(numberConfigSchema, null, { format: "number" })
    expect(result).toEqual({ format: "number" })
  })

  test("invalid raw returns fallback", () => {
    const result = parseConfig(selectConfigSchema, { options: "not-an-array" }, { options: [] })
    expect(result).toEqual({ options: [] })
  })

  test("explicit format options round-trip", () => {
    expect(parseConfig(numberConfigSchema, { format: "number" }, {})).toEqual({ format: "number" })
    expect(parseConfig(numberConfigSchema, { format: "number-with-separators" }, {})).toEqual({
      format: "number-with-separators",
    })
    expect(parseConfig(numberConfigSchema, { format: "percent" }, {})).toEqual({
      format: "percent",
    })
    expect(parseConfig(numberConfigSchema, { format: "compact" }, {})).toEqual({
      format: "compact",
    })
    expect(parseConfig(numberConfigSchema, { format: "compact", decimals: 1 }, {})).toEqual({
      format: "compact",
      decimals: 1,
    })
  })

  test("invalid format value falls back via safeParse failure", () => {
    const result = parseConfig(numberConfigSchema, { format: "scientific" }, { format: "number" })
    expect(result).toEqual({ format: "number" })
  })

  test("legacy step field is stripped silently for back-compat", () => {
    const result = parseConfig(numberConfigSchema, { step: 5, min: 0 }, {})
    expect(result).toEqual({ min: 0, format: "number" })
  })

  test("decimals and percentBasis round-trip on numberConfigSchema", () => {
    expect(
      parseConfig(numberConfigSchema, { format: "percent", decimals: 0, percentBasis: 1 }, {})
    ).toEqual({ format: "percent", decimals: 0, percentBasis: 1 })
    expect(parseConfig(numberConfigSchema, { format: "percent", percentBasis: 100 }, {})).toEqual({
      format: "percent",
      percentBasis: 100,
    })
    expect(parseConfig(numberConfigSchema, { format: "number", decimals: 3 }, {})).toEqual({
      format: "number",
      decimals: 3,
    })
  })

  test("invalid decimals / percentBasis fall back via safeParse failure", () => {
    expect(
      parseConfig(numberConfigSchema, { format: "percent", percentBasis: 50 }, { format: "number" })
    ).toEqual({ format: "number" })
    expect(
      parseConfig(numberConfigSchema, { format: "percent", decimals: -1 }, { format: "number" })
    ).toEqual({ format: "number" })
    expect(
      parseConfig(numberConfigSchema, { format: "percent", decimals: 1.5 }, { format: "number" })
    ).toEqual({ format: "number" })
  })
})

describe("badge display channels", () => {
  test("numberConfigSchema accepts icon and badgeVariant alongside the format surface", () => {
    const result = parseConfig(
      numberConfigSchema,
      { format: "compact", units: "g", prefix: "~", icon: "coins", badgeVariant: "yellow" },
      {}
    )
    expect(result).toEqual({
      format: "compact",
      units: "g",
      prefix: "~",
      icon: "coins",
      badgeVariant: "yellow",
    })
  })

  test("badgeVariant outside the BadgeVariant union fails the parse (no raw colors)", () => {
    expect(
      parseConfig(numberConfigSchema, { badgeVariant: "#ff0000" }, { format: "number" })
    ).toEqual({ format: "number" })
    expect(
      parseConfig(numberConfigSchema, { badgeVariant: "chartreuse" }, { format: "number" })
    ).toEqual({ format: "number" })
    expect(
      parseConfig(numberConfigSchema, { badgeVariant: "legendary" }, { format: "number" })
    ).toEqual({ format: "number" })
  })

  test("every BadgeVariant union member round-trips on numberConfigSchema", () => {
    const members = [
      "accent",
      "elevation-muted",
      "green",
      "blue",
      "purple",
      "yellow",
      "orange",
      "red",
    ] as const
    for (const badgeVariant of members) {
      expect(parseConfig(numberConfigSchema, { badgeVariant }, {})).toEqual({
        format: "number",
        badgeVariant,
      })
    }
  })

  test("textConfigSchema accepts icon and badgeVariant", () => {
    const result = parseConfig(textConfigSchema, { icon: "user", badgeVariant: "purple" }, {})
    expect(result).toEqual({ icon: "user", badgeVariant: "purple" })
  })

  test("textConfigSchema rejects a badgeVariant outside the union", () => {
    expect(parseConfig(textConfigSchema, { badgeVariant: "pink" }, {})).toEqual({})
  })

  test("icon is accepted generally — select and formula configs carry it", () => {
    expect(parseConfig(selectConfigSchema, { options: [], icon: "tag" }, { options: [] })).toEqual({
      options: [],
      icon: "tag",
    })
    const formula = formulaConfigSchema.safeParse({
      expression: "x",
      returnType: "number",
      icon: "zap",
      badgeVariant: "green",
    })
    expect(formula.success).toBe(true)
    if (formula.success) {
      expect(formula.data.icon).toBe("zap")
      expect(formula.data.badgeVariant).toBe("green")
    }
  })

  test("text property definition with badge-display config parses through the discriminated union", () => {
    const result = PropertyDefinitionSchema.safeParse({
      id: "label",
      title: "Label",
      type: "text",
      config: { icon: "tag", badgeVariant: "blue" },
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.config).toEqual({ icon: "tag", badgeVariant: "blue" })
    }
  })
})

describe("formulaConfigSchema number-format surface", () => {
  test("accepts the full number-format surface alongside expression/returnType", () => {
    const result = formulaConfigSchema.safeParse({
      expression: "x * 100",
      returnType: "number",
      format: "percent",
      decimals: 1,
      percentBasis: 100,
      min: 0,
      max: 100,
      units: "pts",
      prefix: "~",
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.format).toBe("percent")
      expect(result.data.decimals).toBe(1)
      expect(result.data.percentBasis).toBe(100)
      expect(result.data.units).toBe("pts")
      expect(result.data.prefix).toBe("~")
    }
  })

  test("accepts format: compact on the formula number-format surface", () => {
    const result = formulaConfigSchema.safeParse({
      expression: "x",
      returnType: "number",
      format: "compact",
      decimals: 1,
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.format).toBe("compact")
      expect(result.data.decimals).toBe(1)
    }
  })

  test("number-format fields are optional and absent by default", () => {
    const result = formulaConfigSchema.safeParse({ expression: "x", returnType: "number" })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.format).toBeUndefined()
      expect(result.data.decimals).toBeUndefined()
      expect(result.data.percentBasis).toBeUndefined()
    }
  })

  test("invalid format value fails the parse", () => {
    const result = formulaConfigSchema.safeParse({
      expression: "x",
      returnType: "number",
      format: "scientific",
    })
    expect(result.success).toBe(false)
  })
})

describe("PropertyDefinitionSchema", () => {
  test("valid text definition parses", () => {
    const result = PropertyDefinitionSchema.safeParse({ id: "t", title: "Text", type: "text" })
    expect(result.success).toBe(true)
  })

  test("valid number definition with config parses", () => {
    const result = PropertyDefinitionSchema.safeParse({
      id: "n",
      title: "Num",
      type: "number",
      config: { min: 0, max: 100 },
    })
    expect(result.success).toBe(true)
  })

  test("unknown type fails", () => {
    const result = PropertyDefinitionSchema.safeParse({ id: "x", title: "X", type: "unknown-type" })
    expect(result.success).toBe(false)
  })

  test("missing required fields fail", () => {
    const result = PropertyDefinitionSchema.safeParse({ type: "text" })
    expect(result.success).toBe(false)
  })

  test("extra fields pass through", () => {
    const result = PropertyDefinitionSchema.safeParse({
      id: "t",
      title: "Text",
      type: "text",
      customField: "value",
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.customField).toBe("value")
    }
  })

  test("no-config variant accepts config: null (markdown)", () => {
    const result = PropertyDefinitionSchema.safeParse({
      id: "notes",
      title: "Notes",
      type: "markdown",
      config: null,
    })
    expect(result.success).toBe(true)
  })

  test("with-config variant accepts config: null (select)", () => {
    const result = PropertyDefinitionSchema.safeParse({
      id: "status",
      title: "Status",
      type: "select",
      config: null,
    })
    expect(result.success).toBe(true)
  })
})
