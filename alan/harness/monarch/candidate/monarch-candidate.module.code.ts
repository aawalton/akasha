import { amountListFrom } from "../rule-amounts/monarch-rule-amounts.module.code.ts"
import { checkedRule } from "../rule-clauses/monarch-rule-clauses.module.code.ts"
import { dateFloorFrom, monthListFrom } from "../rule-dates/monarch-rule-dates.module.code.ts"
import { categoryIdByName, signFrom } from "../rule-pages/monarch-rule-pages.module.code.ts"
import type { Rule } from "../rules/monarch-rules.module.code.ts"

export async function candidateRule(
  flags: ReadonlyMap<string, readonly string[]>
): Promise<Rule | null> {
  const one = (key: string): string | null => flags.get(key)?.[0] ?? null
  const name = one("candidate")
  if (name === null) return null
  const categoryName = one("category")
  const reserve = flags.has("reserve")
  if (reserve === (categoryName !== null)) {
    throw new Error(
      "a candidate names exactly one outcome: --reserve, or --category <name> — this one names " +
        (reserve ? "both" : "neither")
    )
  }
  const within = one("counterpart-within-days")
  const days = within === null ? null : Number.parseInt(within, 10)
  if (days !== null && !Number.isFinite(days)) {
    throw new Error(`--counterpart-within-days ${within} is not a number of days`)
  }
  return checkedRule({
    name,
    descriptionContains: [],
    merchantIs: flags.get("merchant-is") ?? [],
    merchantContains: flags.get("merchant-contains") ?? [],
    statementContains: flags.get("statement-contains") ?? [],
    accountIs: flags.get("account-is") ?? [],
    accountIsNot: flags.get("account-is-not") ?? [],
    amountSign: signFrom(one("amount-sign"), "--amount-sign"),
    amountSignIsNot: signFrom(one("amount-sign-is-not"), "--amount-sign-is-not"),
    amountIs: amountListFrom(flags.get("amount-is") ?? [], "--amount-is"),
    amountIsNot: amountListFrom(flags.get("amount-is-not") ?? [], "--amount-is-not"),
    counterpart: days === null ? null : { withinDays: days },
    onOrAfter: dateFloorFrom(one("on-or-after"), "--on-or-after"),
    before: dateFloorFrom(one("before"), "--before"),
    monthIs: monthListFrom(flags.get("month-is") ?? [], "--month-is"),
    monthIsNot: monthListFrom(flags.get("month-is-not") ?? [], "--month-is-not"),
    note: flags.get("note")?.join(" ") ?? null,
    outcome:
      categoryName === null
        ? { kind: "reserve" }
        : { kind: "categorize", category: await categoryIdByName(categoryName) },
  })
}
