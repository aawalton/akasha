import { describe, expect, test } from "bun:test"
import { asPropertyDefinition } from "./_color-rules-test-helpers.ts"
import { resolveBadgeVariant, shapeOfColorRule } from "./color-rules.ts"
import {
  type BadgeVariant,
  type ColorRule,
  type ColorRuleVariant,
  colorRuleSchema,
  colorRuleVariants,
} from "./schema/color-rule.ts"

function defWithRules(id: string, colorRules: readonly ColorRule[] | undefined) {
  return asPropertyDefinition({ id, type: "text", colorRules })
}

describe("shapeOfColorRule", () => {
  test("declares `value` at the type of the property the rule hangs off", () => {
    expect(shapeOfColorRule(asPropertyDefinition({ id: "s", type: "select" }))).toEqual({
      value: { kind: "text" },
    })
    expect(shapeOfColorRule(asPropertyDefinition({ id: "n", type: "number" }))).toEqual({
      value: { kind: "number" },
    })
    expect(shapeOfColorRule(asPropertyDefinition({ id: "b", type: "boolean" }))).toEqual({
      value: { kind: "boolean" },
    })
    expect(shapeOfColorRule(asPropertyDefinition({ id: "d", type: "calendar-date" }))).toEqual({
      value: { kind: "date" },
    })
    expect(shapeOfColorRule(asPropertyDefinition({ id: "i", type: "instant" }))).toEqual({
      value: { kind: "instant" },
    })
  })

  test("a multi-select badge paints one option at a time, so `value` is a text", () => {
    expect(shapeOfColorRule(asPropertyDefinition({ id: "tags", type: "multi-select" }))).toEqual({
      value: { kind: "text" },
    })
  })

  test("a type whose value no formula can name has no shape", () => {
    expect(shapeOfColorRule(asPropertyDefinition({ id: "rel", type: "relation" }))).toBeNull()
  })

  test("the shape declares `value` and nothing else", () => {
    const shape = shapeOfColorRule(asPropertyDefinition({ id: "s", type: "select" }))
    expect(Object.keys(shape ?? {})).toEqual(["value"])
  })
})

describe("resolveBadgeVariant", () => {
  describe("no rules", () => {
    test("undefined colorRules returns null", () => {
      expect(resolveBadgeVariant(defWithRules("status", undefined), {}, "any")).toBeNull()
    })

    test("empty colorRules returns null", () => {
      expect(resolveBadgeVariant(defWithRules("status", []), {}, "any")).toBeNull()
    })
  })

  describe("first-match-wins", () => {
    test("single rule with a matching expression returns its variant", () => {
      const def = defWithRules("status", [
        { when: '{value} == "urgent"', variant: "red" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, "urgent")).toBe("red")
    })

    test("multiple rules, the second matching, returns the second variant", () => {
      const def = defWithRules("status", [
        { when: '{value} == "urgent"', variant: "red" satisfies BadgeVariant },
        { when: '{value} == "normal"', variant: "green" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, "normal")).toBe("green")
    })

    test("multiple rules, the first matching, leaves the later ones unconsulted", () => {
      const def = defWithRules("status", [
        { when: '{value} == "urgent"', variant: "red" satisfies BadgeVariant },
        { when: '{value} == "urgent"', variant: "green" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, "urgent")).toBe("red")
    })

    test("no rule matches, so nothing is painted", () => {
      const def = defWithRules("status", [
        { when: '{value} == "urgent"', variant: "red" satisfies BadgeVariant },
        { when: '{value} == "normal"', variant: "green" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, "other")).toBeNull()
    })

    test("a number rule reads the number the rule hangs off", () => {
      const def = asPropertyDefinition({
        id: "qty",
        type: "number",
        colorRules: [
          { when: "{value} >= 10000", variant: "green" satisfies BadgeVariant },
          { when: "{value} > 0", variant: "yellow" satisfies BadgeVariant },
          { when: "true", variant: "red" satisfies BadgeVariant },
        ],
      })
      expect(resolveBadgeVariant(def, {}, 12000)).toBe("green")
      expect(resolveBadgeVariant(def, {}, 5000)).toBe("yellow")
      expect(resolveBadgeVariant(def, {}, -1)).toBe("red")
    })
  })

  describe("refused at check time", () => {
    test("a key the shape does not declare is refused", () => {
      const def = defWithRules("priority", [
        { when: '{urgency} == "high"', variant: "red" satisfies BadgeVariant },
      ])
      expect(() => resolveBadgeVariant(def, {}, "ignored")).toThrow(
        /no property is declared under the key `urgency`/
      )
    })

    test("`source` is no longer a name a rule reaches the page by", () => {
      const def = defWithRules("priority", [
        { when: '{source} == "high"', variant: "red" satisfies BadgeVariant },
      ])
      expect(() => resolveBadgeVariant(def, { urgency: "high" }, "ignored")).toThrow(
        /no property is declared under the key `source`/
      )
    })

    test("a bare `value` is refused, a reference being spelled `{value}`", () => {
      const def = defWithRules("status", [
        { when: 'value == "urgent"', variant: "red" satisfies BadgeVariant },
      ])
      expect(() => resolveBadgeVariant(def, {}, "urgent")).toThrow(/`value` is no value/)
    })

    test("a malformed rule is refused rather than skipped", () => {
      const def = defWithRules("status", [
        { when: "@@@", variant: "red" satisfies BadgeVariant },
        { when: '{value} == "ok"', variant: "green" satisfies BadgeVariant },
      ])
      expect(() => resolveBadgeVariant(def, {}, "ok")).toThrow(
        /`@` is no part of the formula language/
      )
    })

    test("a rule on a type whose value no formula can name is refused", () => {
      const def = asPropertyDefinition({
        id: "owner",
        type: "relation",
        colorRules: [{ when: "true", variant: "red" satisfies BadgeVariant }],
      })
      expect(() => resolveBadgeVariant(def, {}, "anything")).toThrow(
        /has no value a formula can name/
      )
    })
  })

  describe("bindings", () => {
    test("`{value}` resolves to the value argument", () => {
      const def = defWithRules("status", [
        { when: '{value} == "hi"', variant: "green" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, "hi")).toBe("green")
    })

    test("a value of another shape reads as absent rather than matching", () => {
      const def = defWithRules("status", [
        { when: '{value} == "hi"', variant: "green" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, undefined)).toBeNull()
      expect(resolveBadgeVariant(def, {}, 42)).toBeNull()
    })

    test("the page the property sits on is not reachable from a rule", () => {
      const def = defWithRules("priority", [
        { when: '{value} == "high"', variant: "red" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, { urgency: "high" }, "low")).toBeNull()
    })
  })

  describe("seven-color palette", () => {
    test("`default` variant maps to the Badge cva `elevation-muted` token", () => {
      const def = defWithRules("status", [
        { when: '{value} == "parked"', variant: "default" satisfies ColorRuleVariant },
      ])
      expect(resolveBadgeVariant(def, {}, "parked")).toBe("elevation-muted")
    })

    test.each([
      "yellow",
      "blue",
      "purple",
      "orange",
      "green",
      "red",
    ] as const)("`%s` color variant passes through to the matching BadgeVariant", (gem) => {
      const def = defWithRules("status", [{ when: '{value} == "x"', variant: gem }])
      expect(resolveBadgeVariant(def, {}, "x")).toBe(gem)
    })

    test("`colorRuleVariants` is exactly the seven-color palette", () => {
      expect([...colorRuleVariants]).toEqual([
        "default",
        "green",
        "blue",
        "purple",
        "yellow",
        "orange",
        "red",
      ])
    })
  })

  describe("legacy-variant coercion at the schema boundary", () => {
    test("`elevation-muted` parses as `default`", () => {
      const parsed = colorRuleSchema.parse({ when: '{value} == "x"', variant: "elevation-muted" })
      expect(parsed.variant).toBe("default")
    })

    test("`accent` parses as `yellow`", () => {
      const parsed = colorRuleSchema.parse({ when: '{value} == "x"', variant: "accent" })
      expect(parsed.variant).toBe("yellow")
    })

    test.each([
      ["emerald", "green"],
      ["sapphire", "blue"],
      ["amethyst", "purple"],
      ["topaz", "yellow"],
      ["carnelian", "orange"],
      ["ruby", "red"],
    ] as const)("legacy gemstone `%s` parses as plain `%s`", (legacy, plain) => {
      const parsed = colorRuleSchema.parse({ when: "true", variant: legacy })
      expect(parsed).toEqual({ when: "true", variant: plain })
    })

    test("each ColorRuleVariant parses as itself", () => {
      for (const variant of colorRuleVariants) {
        const parsed = colorRuleSchema.parse({ when: '{value} == "x"', variant })
        expect(parsed.variant).toBe(variant)
      }
    })

    test("unknown variant throws at parse", () => {
      expect(() => colorRuleSchema.parse({ when: '{value} == "x"', variant: "fuchsia" })).toThrow()
    })

    test("legacy `elevation-muted` in a colorRule resolves to the token of the same name", () => {
      const raw = { when: '{value} == "parked"', variant: "elevation-muted" }
      const rule = colorRuleSchema.parse(raw) satisfies ColorRule
      expect(resolveBadgeVariant(defWithRules("status", [rule]), {}, "parked")).toBe(
        "elevation-muted"
      )
    })

    test("legacy `accent` in a colorRule resolves to `yellow`", () => {
      const raw = { when: '{value} == "pair_bond"', variant: "accent" }
      const rule = colorRuleSchema.parse(raw) satisfies ColorRule
      expect(resolveBadgeVariant(defWithRules("currentCircle", [rule]), {}, "pair_bond")).toBe(
        "yellow"
      )
    })
  })
})
