import { z } from "zod"

const ValueInRuleSchema = z
  .object({
    kind: z.literal("valueIn"),
    key: z.string().min(1),
    allowed: z.array(z.string().min(1)).min(1),
  })
  .strict()

const RequiresRuleSchema = z
  .object({
    kind: z.literal("requires"),
    when: z.object({ key: z.string().min(1), eq: z.string().min(1) }).strict(),
    require: z.array(z.array(z.string().min(1)).min(1)).min(1),
  })
  .strict()

const NumericEqualityWhenPresentRuleSchema = z
  .object({
    kind: z.literal("numericEqualityWhenPresent"),
    whenPresent: z.string().min(1),
    left: z.string().min(1),
    right: z.string().min(1),
  })
  .strict()

const MoveValueToListWhenValueInRuleSchema = z
  .object({
    kind: z.literal("moveValueToListWhenValueIn"),
    when: z.object({ key: z.string().min(1), in: z.array(z.string().min(1)).min(1) }).strict(),
    from: z.string().min(1),
    to: z.string().min(1),
  })
  .strict()

const CoherenceRuleSchema = z.discriminatedUnion("kind", [
  ValueInRuleSchema,
  RequiresRuleSchema,
  NumericEqualityWhenPresentRuleSchema,
  MoveValueToListWhenValueInRuleSchema,
])

export const CoherenceRulesSchema = z.array(CoherenceRuleSchema)

export type CoherenceRule = z.infer<typeof CoherenceRuleSchema>

type CoherenceRuleKind = CoherenceRule["kind"]

const COHERENCE_RULE_ARMS = {
  valueIn: { compose: false, guard: true },
  requires: { compose: false, guard: true },
  numericEqualityWhenPresent: { compose: true, guard: true },
  moveValueToListWhenValueIn: { compose: true, guard: false },
} as const satisfies Record<
  CoherenceRuleKind,
  { readonly compose: boolean; readonly guard: boolean }
>

function isMeaningfullyPresent(value: unknown): boolean {
  if (value === undefined || value === null) return false
  if (typeof value === "string") return value.length > 0
  if (Array.isArray(value)) return value.some((e) => typeof e === "string" && e.length > 0)
  return true
}

function scalarText(value: unknown): string | null {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return null
}

const NUMERIC_TEXT = /^-?[0-9]+(\.[0-9]+)?$/

function numericValue(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0
  if (typeof value === "string" && NUMERIC_TEXT.test(value)) return Number(value)
  return 0
}

function quoteList(keys: readonly string[]): string {
  return keys.map((k) => `"${k}"`).join(", ")
}

export function evaluateCoherenceRules(
  rules: readonly CoherenceRule[],
  attributes: Readonly<Record<string, unknown>>
): readonly string[] {
  const violations: string[] = []
  for (const rule of rules) {
    if (!COHERENCE_RULE_ARMS[rule.kind].guard) continue
    if (rule.kind === "valueIn") {
      const value = attributes[rule.key]
      if (!isMeaningfullyPresent(value)) continue
      if (typeof value !== "string") {
        violations.push(
          `property "${rule.key}" non-string value not in [${rule.allowed.join(", ")}]`
        )
      } else if (!rule.allowed.includes(value)) {
        violations.push(
          `property "${rule.key}" value "${value}" not in [${rule.allowed.join(", ")}]`
        )
      }
      continue
    }
    if (rule.kind === "numericEqualityWhenPresent") {
      if (!isMeaningfullyPresent(attributes[rule.whenPresent])) continue
      if (numericValue(attributes[rule.left]) !== numericValue(attributes[rule.right])) {
        violations.push(`"${rule.whenPresent}" present requires "${rule.left}" == "${rule.right}"`)
      }
      continue
    }
    if (rule.kind === "requires") {
      if (scalarText(attributes[rule.when.key]) !== rule.when.eq) continue
      for (const group of rule.require) {
        if (group.some((key) => isMeaningfullyPresent(attributes[key]))) continue
        const detail =
          group.length === 1
            ? `requires ${quoteList(group)}`
            : `requires one of ${quoteList(group)}`
        violations.push(`${rule.when.key}="${rule.when.eq}" ${detail}`)
      }
    }
  }
  return violations
}
