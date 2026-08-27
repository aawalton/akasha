import { describe, expect, test } from "bun:test"
import { asPropertyDefinition } from "./_color-rules-test-helpers"
import { type BadgeVariant, type ColorRule, resolveBadgeVariant } from "./color-rules"
import { type ColorRuleVariant, colorRuleSchema, colorRuleVariants } from "./schema/color-rule"

function defWithRules(id: string, colorRules: readonly ColorRule[] | undefined) {
  return asPropertyDefinition({ id, type: "text", colorRules })
}

describe("resolveBadgeVariant", () => {
  describe("no rules", () => {
    test("undefined colorRules returns null", () => {
      const def = defWithRules("status", undefined)
      expect(resolveBadgeVariant(def, {}, "any")).toBeNull()
    })

    test("empty colorRules returns null", () => {
      const def = defWithRules("status", [])
      expect(resolveBadgeVariant(def, {}, "any")).toBeNull()
    })
  })

  describe("first-match-wins", () => {
    test("single rule with truthy expression returns its variant", () => {
      const def = defWithRules("status", [
        { when: "value == 'urgent'", variant: "red" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, "urgent")).toBe("red")
    })

    test("multiple rules, second matches → returns second's variant", () => {
      const def = defWithRules("status", [
        { when: "value == 'urgent'", variant: "red" satisfies BadgeVariant },
        { when: "value == 'normal'", variant: "green" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, "normal")).toBe("green")
    })

    test("multiple rules, first matches → later rules are not consulted", () => {
      const def = defWithRules("status", [
        { when: "value == 'urgent'", variant: "red" satisfies BadgeVariant },
        { when: "value == 'urgent'", variant: "green" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, "urgent")).toBe("red")
    })

    test("no rule matches → null", () => {
      const def = defWithRules("status", [
        { when: "value == 'urgent'", variant: "red" satisfies BadgeVariant },
        { when: "value == 'normal'", variant: "green" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, "other")).toBeNull()
    })

    test("expression evaluates to null → treated as no-match, falls through", () => {
      const def = defWithRules("status", [
        { when: "prop(missing) == 'x'", variant: "red" satisfies BadgeVariant },
        { when: "value == 'fallback'", variant: "green" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, "fallback")).toBe("green")
    })
  })

  describe("error tolerance", () => {
    test("malformed `when` does not throw — falls through to next rule", () => {
      const def = defWithRules("status", [
        { when: "@@@ not a valid expression @@@", variant: "red" satisfies BadgeVariant },
        { when: "value == 'ok'", variant: "green" satisfies BadgeVariant },
      ])
      expect(() => resolveBadgeVariant(def, {}, "ok")).not.toThrow()
      expect(resolveBadgeVariant(def, {}, "ok")).toBe("green")
    })

    test("malformed `when` with no fallback rule → null (does not throw)", () => {
      const def = defWithRules("status", [{ when: "@@@", variant: "red" satisfies BadgeVariant }])
      expect(() => resolveBadgeVariant(def, {}, "anything")).not.toThrow()
      expect(resolveBadgeVariant(def, {}, "anything")).toBeNull()
    })
  })

  describe("bindings", () => {
    test("`value` resolves to the value argument", () => {
      const def = defWithRules("status", [
        { when: "value == 'hi'", variant: "green" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, "hi")).toBe("green")
    })

    test("`source.<id>` resolves to pageData[id]", () => {
      const def = defWithRules("priority", [
        { when: "source.urgency == 'high'", variant: "red" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, { urgency: "high" }, "ignored")).toBe("red")
    })

    test('`prop("<id>")` resolves to pageData[id]', () => {
      const def = defWithRules("priority", [
        { when: "prop(urgency) == 'high'", variant: "red" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, { urgency: "high" }, "ignored")).toBe("red")
    })
  })

  describe("integration with formula functions", () => {
    test("date-in-past rule via today() matches old date", () => {
      const def = defWithRules("dueDate", [
        {
          when: "parseCalendarDate(value) < parseCalendarDate(today())",
          variant: "orange" satisfies BadgeVariant,
        },
      ])
      expect(resolveBadgeVariant(def, {}, "2020-01-01")).toBe("orange")
    })

    test("contains() over multi-select value matches when item present", () => {
      const def = defWithRules("tags", [
        { when: "contains(value, 'urgent')", variant: "red" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, ["urgent", "other"])).toBe("red")
    })

    test("contains() returns null when item absent → resolver returns null", () => {
      const def = defWithRules("tags", [
        { when: "contains(value, 'urgent')", variant: "red" satisfies BadgeVariant },
      ])
      expect(resolveBadgeVariant(def, {}, ["other"])).toBeNull()
    })
  })

  describe("seven-color palette", () => {
    test("`default` variant maps to the Badge cva `elevation-muted` token", () => {
      const def = defWithRules("status", [
        { when: "value == 'parked'", variant: "default" satisfies ColorRuleVariant },
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
      const def = defWithRules("status", [{ when: "value == 'x'", variant: gem }])
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
      const parsed = colorRuleSchema.parse({ when: "value == 'x'", variant: "elevation-muted" })
      expect(parsed.variant).toBe("default")
    })

    test("`accent` parses as `yellow`", () => {
      const parsed = colorRuleSchema.parse({ when: "value == 'x'", variant: "accent" })
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
      const parsed = colorRuleSchema.parse({ when: "x", variant: legacy })
      expect(parsed).toEqual({ when: "x", variant: plain })
    })

    test("each ColorRuleVariant parses as itself (identity)", () => {
      for (const variant of colorRuleVariants) {
        const parsed = colorRuleSchema.parse({ when: "value == 'x'", variant })
        expect(parsed.variant).toBe(variant)
      }
    })

    test("unknown variant throws at parse", () => {
      expect(() => colorRuleSchema.parse({ when: "value == 'x'", variant: "fuchsia" })).toThrow()
    })

    test("legacy `elevation-muted` in a colorRule resolves to the Badge cva token of the same name", () => {
      const raw = { when: "value == 'parked'", variant: "elevation-muted" }
      const rule = colorRuleSchema.parse(raw) satisfies ColorRule
      const def = defWithRules("status", [rule])
      expect(resolveBadgeVariant(def, {}, "parked")).toBe("elevation-muted")
    })

    test("legacy `accent` in a colorRule resolves to `yellow`", () => {
      const raw = { when: "value == 'pair_bond'", variant: "accent" }
      const rule = colorRuleSchema.parse(raw) satisfies ColorRule
      const def = defWithRules("currentCircle", [rule])
      expect(resolveBadgeVariant(def, {}, "pair_bond")).toBe("yellow")
    })
  })
})
