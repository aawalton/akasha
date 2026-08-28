import {
  checkFormula,
  runFormula,
  type DeclaredType,
  type Shape,
  type Value,
} from "../../../pages-system/formula/formula.ts"
import type { PropertyValue } from "./property-types/types.ts"
import type { BadgeVariant, ColorRuleVariant } from "./schema/color-rule.ts"
import type { PageDataJSON, PropertyDefinition, PropertyType } from "./types.ts"

export function colorRuleVariantToBadgeVariant(variant: ColorRuleVariant): BadgeVariant {
  return variant === "default" ? "elevation-muted" : variant
}

const VALUE_TYPE: Partial<Record<PropertyType, DeclaredType>> = {
  text: { kind: "text" },
  markdown: { kind: "text" },
  url: { kind: "text" },
  select: { kind: "text" },
  "path-select": { kind: "text" },
  "multi-select": { kind: "text" },
  "calendar-time": { kind: "text" },
  number: { kind: "number" },
  progress: { kind: "number" },
  boolean: { kind: "boolean" },
  "calendar-date": { kind: "date" },
  instant: { kind: "instant" },
}

export function shapeOfColorRule(definition: PropertyDefinition): Shape | null {
  const declared = VALUE_TYPE[definition.type]
  return declared === undefined ? null : { value: declared }
}

function valueFor(declared: DeclaredType, held: PropertyValue): Value {
  if (declared.kind === "text") {
    return typeof held === "string" ? { kind: "text", text: held } : { kind: "absent" }
  }
  if (declared.kind === "number") {
    return typeof held === "number" && Number.isFinite(held)
      ? { kind: "number", number: held }
      : { kind: "absent" }
  }
  if (declared.kind === "boolean") {
    return typeof held === "boolean" ? { kind: "boolean", boolean: held } : { kind: "absent" }
  }
  if (declared.kind === "date") {
    return typeof held === "string" ? { kind: "date", date: held } : { kind: "absent" }
  }
  if (declared.kind === "instant") {
    return typeof held === "number" && Number.isFinite(held)
      ? { kind: "instant", instant: held }
      : { kind: "absent" }
  }
  return { kind: "absent" }
}

export function resolveBadgeVariant(
  definition: PropertyDefinition,
  _pageData: PageDataJSON,
  value: PropertyValue
): BadgeVariant | null {
  const rules = definition.colorRules
  if (!rules || rules.length === 0) return null

  const shape = shapeOfColorRule(definition)
  const declared = VALUE_TYPE[definition.type]
  if (shape === null || declared === undefined) {
    throw new Error(
      `a color rule stands on \`${definition.id}\`, whose type \`${definition.type}\` has no value a formula can name`
    )
  }

  const values = { now: Date.now(), properties: { value: valueFor(declared, value) } }

  for (const rule of rules) {
    const checked = checkFormula(rule.when, shape)
    if (!checked.ok) {
      throw new Error(
        `the color rule \`${rule.when}\` on \`${definition.id}\` is refused: ${checked.message}`
      )
    }
    const answered = runFormula(checked, values)
    if (answered.kind === "boolean" && answered.boolean) {
      return colorRuleVariantToBadgeVariant(rule.variant)
    }
  }

  return null
}
