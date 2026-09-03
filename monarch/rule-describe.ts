
import { describeAmountClause } from "./rule-amounts.ts"
import { describeDateClauses } from "./rule-dates.ts"
import type { Rule } from "./rules.ts"

function quoted(texts: readonly string[]): string {
  return texts.map((text) => `"${text}"`).join(" or ")
}

/** A clause excluding several values excludes every one of them, so they are joined with "and". */
function quotedAll(texts: readonly string[]): string {
  return texts.map((text) => `"${text}"`).join(" and ")
}

export function describeClauses(rule: Rule): string {
  const parts: string[] = []
  if (rule.merchantIs.length > 0) parts.push(`merchant = ${quoted(rule.merchantIs)}`)
  if (rule.merchantContains.length > 0) parts.push(`merchant ~ ${quoted(rule.merchantContains)}`)
  if (rule.statementContains.length > 0) parts.push(`statement ~ ${quoted(rule.statementContains)}`)
  for (const group of rule.descriptionContains) parts.push(`description ~ ${quoted(group)}`)
  if (rule.accountIs.length > 0) parts.push(`account = ${quoted(rule.accountIs)}`)
  if (rule.accountIsNot.length > 0) parts.push(`account != ${quotedAll(rule.accountIsNot)}`)
  if (rule.amountSign !== null) parts.push(`amount ${rule.amountSign}`)
  if (rule.amountSignIsNot !== null) parts.push(`amount not ${rule.amountSignIsNot}`)
  if (rule.counterpart !== null) {
    parts.push(`unique opposite amount elsewhere within ${rule.counterpart.withinDays}d`)
  }
  for (const part of describeAmountClause(rule)) parts.push(part)
  for (const part of describeDateClauses(rule)) parts.push(part)
  return parts.join(" and ")
}
