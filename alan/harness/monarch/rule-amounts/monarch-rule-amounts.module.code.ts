import { array, num } from "../shape/monarch-shape.module.code.ts"
import { cents } from "../transaction/monarch-transaction.module.code.ts"

export interface AmountClause {
  readonly amountIs: readonly number[]
  readonly amountIsNot: readonly number[]
}

export function amountClauseMatches(clause: AmountClause, amount: number): boolean {
  const at = cents(amount)
  if (clause.amountIsNot.some((named) => cents(named) === at)) return false
  if (clause.amountIs.length === 0) return true
  return clause.amountIs.some((named) => cents(named) === at)
}

export function checkedAmountClause(name: string, clause: AmountClause): void {
  for (const amount of clause.amountIs) {
    if (!Number.isFinite(amount)) {
      throw new Error(`rule "${name}" names amount ${amount}, which is not a number of dollars`)
    }
    if (cents(amount) === 0) {
      throw new Error(
        `rule "${name}" names an amount of zero. No transaction this project writes carries one, ` +
          "so the clause would match nothing and read as a rule whose merchant has stopped coming."
      )
    }
  }
  for (const amount of clause.amountIsNot) {
    if (!Number.isFinite(amount)) {
      throw new Error(`rule "${name}" excludes amount ${amount}, which is not a number of dollars`)
    }
    if (cents(amount) === 0) {
      throw new Error(
        `rule "${name}" excludes an amount of zero. No transaction this project writes carries one, ` +
          "so the clause would exclude nothing and read as narrower than the rule is."
      )
    }
  }
}

export function amountListFrom(value: unknown, path: string): readonly number[] {
  if (value === undefined || value === null || value === "") return []
  const entries = Array.isArray(value) ? value : [value]
  return array(entries, path).map((entry, i) => {
    const at = `${path}[${i}]`
    if (typeof entry === "string") {
      const parsed = Number.parseFloat(entry)
      if (!Number.isFinite(parsed)) throw new Error(`${at}: "${entry}" is not an amount`)
      return parsed
    }
    return num(entry, at)
  })
}

export function describeAmountClause(clause: AmountClause): readonly string[] {
  const parts: string[] = []
  if (clause.amountIs.length > 0) {
    parts.push(`amount = ${clause.amountIs.map((amount) => amount.toFixed(2)).join(" or ")}`)
  }
  if (clause.amountIsNot.length > 0) {
    parts.push(`amount != ${clause.amountIsNot.map((amount) => amount.toFixed(2)).join(" and ")}`)
  }
  return parts
}
