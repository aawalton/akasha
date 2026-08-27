import { parse } from "yaml"
import { z } from "zod"
import type { Violation } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"

export const EPOCH_FLOOR = 1_000_000_000

const BINARY_SIZE_UNIT = 1024 * 1024

function isBinarySize(value: number): boolean {
  return Number.isInteger(value) && value % BINARY_SIZE_UNIT === 0
}

const NUMERIC_LITERAL_RE = /(?<![\w.])\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(?![\w])/g

const rulesDocSchema = z.object({
  groups: z.array(
    z.object({
      name: z.string().optional(),
      rules: z.array(
        z.object({
          alert: z.string().optional(),
          record: z.string().optional(),
          expr: z.string().optional(),
        })
      ),
    })
  ),
})

export interface AlertEpochLiteralViolation extends Violation {
  readonly kind: "alert-expr-epoch-literal"
  readonly rule: string
  readonly literal: string
  readonly expr: string
  readonly message: string
}

export interface AlertRule {
  readonly group: string | undefined
  readonly name: string
  readonly expr: string | undefined
}

export function parseAlertRules(rulesYaml: string): readonly AlertRule[] {
  const doc = rulesDocSchema.parse(parse(rulesYaml))
  return doc.groups.flatMap((group) =>
    group.rules.map((rule) => ({
      group: group.name,
      name: rule.alert ?? rule.record ?? "(unnamed rule)",
      expr: rule.expr,
    }))
  )
}

export function scanAlertRule(rule: AlertRule): readonly AlertEpochLiteralViolation[] {
  const expr = rule.expr
  if (expr === undefined) return []
  const violations: AlertEpochLiteralViolation[] = []
  for (const match of expr.matchAll(NUMERIC_LITERAL_RE)) {
    const literal = match[0]
    const value = Number(literal)
    if (value < EPOCH_FLOOR) continue
    if (isBinarySize(value)) continue
    violations.push({
      kind: "alert-expr-epoch-literal",
      rule: rule.name,
      literal,
      expr,
      message:
        `\`${literal}\` is an absolute unix timestamp (${new Date(value * 1000).toISOString()}). ` +
        `A time-scoped gate silences the recovery as well as the failure. Scope the suppression to the ` +
        `state instead (\`and on() (some_gauge == 0)\`), which self-clears. A genuine large threshold is ` +
        `written as a product (\`21 * 24 * 3600\`); a genuine byte size is written on an exact mebibyte ` +
        `boundary (\`536870912\`), which this scan reads as a size rather than as an instant.`,
    })
  }
  return violations
}

export function scanAlertEpochLiterals(rulesYaml: string): readonly AlertEpochLiteralViolation[] {
  return parseAlertRules(rulesYaml).flatMap((rule) => scanAlertRule(rule))
}
