import type { HistoryRow } from "../history/monarch-history.module.code.ts"
import { describeClauses } from "../rule-describe/monarch-rule-describe.module.code.ts"
import type { Decision, Rule } from "../rules/monarch-rules.module.code.ts"
import {
  answered,
  TRUSTED_MONTHS,
  trustedFrom,
} from "../transaction/monarch-transaction.module.code.ts"

export interface Decided {
  readonly rule: Rule
  readonly decision: Decision
}

export interface Proposal {
  readonly row: HistoryRow
  readonly decided: readonly Decided[]
}

const STATEMENT_KEY = 34

function pad(text: string, width: number): string {
  return text.length >= width ? text.slice(0, width) : text + " ".repeat(width - text.length)
}

function padLeft(text: string, width: number): string {
  return text.length >= width ? text : " ".repeat(width - text.length) + text
}

function money(amount: number): string {
  return amount.toFixed(2)
}

function tally(items: readonly string[]): readonly (readonly [string, number])[] {
  const counts = new Map<string, number>()
  for (const item of items) counts.set(item, (counts.get(item) ?? 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
}

function outcomeOf(rule: Rule, titles: ReadonlyMap<string, string>): string {
  const note = rule.note === null ? "" : ` and note "${rule.note}"`
  return rule.outcome.kind === "reserve"
    ? "reserve for a person"
    : `set ${titles.get(rule.outcome.category) ?? rule.outcome.category}${note}`
}

function rowLine(row: HistoryRow): string {
  return (
    `    ${row.date}  ${padLeft(money(row.amount), 10)}  ${pad(row.merchant, 30)}  ` +
    `${pad(row.standingCategory === "" ? "(none)" : row.standingCategory, 20)}  ${row.statement}`
  )
}

function listRows(rows: readonly HistoryRow[], limit: number, out: string[]): void {
  out.push(
    `    ${pad("date", 10)}  ${padLeft("amount", 10)}  ${pad("merchant", 30)}  ` +
      `${pad("standing", 20)}  statement`
  )
  for (const row of rows.slice(0, limit)) out.push(rowLine(row))
  if (rows.length > limit) out.push(`    … and ${rows.length - limit} more`)
}

function reserveBlock(rows: readonly HistoryRow[], limit: number, out: string[]): void {
  out.push("")
  out.push("  the category standing on what it caught")
  for (const [name, count] of tally(
    rows.map((r) => (r.standingCategory === "" ? "(none)" : r.standingCategory))
  )) {
    out.push(`    ${padLeft(String(count), 7)}  ${name}`)
  }
  const byStatement = new Map<string, HistoryRow[]>()
  for (const row of rows) {
    const key = row.statement.slice(0, STATEMENT_KEY)
    const held = byStatement.get(key)
    if (held === undefined) byStatement.set(key, [row])
    else held.push(row)
  }
  const groups = [...byStatement.entries()].sort((a, b) => b[1].length - a[1].length)
  out.push("")
  out.push(
    `  by statement — ${groups.length} group(s), the ${Math.min(limit, groups.length)} largest. ` +
      "Where one merchant carries two kinds of money, this is where it shows."
  )
  out.push(`    ${padLeft("count", 7)}  ${pad("statement", STATEMENT_KEY)}  categories standing`)
  for (const [key, held] of groups.slice(0, limit)) {
    const spread = tally(
      held.map((r) => (r.standingCategory === "" ? "(none)" : r.standingCategory))
    )
      .slice(0, 4)
      .map(([name, count]) => `${name} ${count}`)
      .join(", ")
    out.push(`    ${padLeft(String(held.length), 7)}  ${pad(key, STATEMENT_KEY)}  ${spread}`)
  }
  if (groups.length > limit) out.push(`    … and ${groups.length - limit} more group(s)`)
}

function categorizeBlock(
  wanted: string,
  rows: readonly HistoryRow[],
  titles: ReadonlyMap<string, string>,
  limit: number,
  out: string[]
): void {
  const from = trustedFrom()
  const blank = rows.filter((row) => !answered(row.standingCategory))
  const answers = rows.filter((row) => answered(row.standingCategory))
  const scored = answers.filter((row) => row.date >= from)
  const older = answers.filter((row) => row.date < from)
  const agree = scored.filter((row) => row.standingCategoryId === wanted)
  const disagree = scored.filter((row) => row.standingCategoryId !== wanted)
  const olderAgree = older.filter((row) => row.standingCategoryId === wanted)

  out.push("")
  out.push(`  would fill a row nobody has answered: ${blank.length}`)
  out.push(`  scored, inside the ${TRUSTED_MONTHS} months from ${from} — ${scored.length}`)
  out.push(`    agrees with what stands: ${agree.length}`)
  out.push(`    disagrees with what stands: ${disagree.length}`)
  out.push(
    `  older than that and NOT scored — ${older.length} (${olderAgree.length} would agree, ` +
      `${older.length - olderAgree.length} would not). Those categories were not maintained, ` +
      "so neither figure measures the rule."
  )
  if (disagree.length === 0) return
  out.push("")
  out.push(
    `  DISAGREEMENTS — it would set ${titles.get(wanted) ?? wanted} over a category somebody ` +
      "chose inside the window. These are the ones worth arguing about."
  )
  listRows(disagree, limit, out)
}

function pairedLine(row: HistoryRow, counterpart: HistoryRow | undefined): string {
  if (counterpart === undefined) return rowLine(row)
  return (
    `${rowLine(row)}\n      paired to  ${counterpart.date}  ` +
    `${padLeft(money(counterpart.amount), 10)}  ${pad(counterpart.account, 34)}  ` +
    `${counterpart.merchant}`
  )
}

function ambiguousBlock(
  entries: readonly { readonly row: HistoryRow; readonly decision: Decision }[],
  rowsById: ReadonlyMap<string, HistoryRow>,
  limit: number,
  out: string[]
): void {
  out.push("")
  out.push(
    `  AMBIGUOUS — ${entries.length}. Nothing fires on these and nothing is guessed between the ` +
      "candidates; they fall through to semantic review."
  )
  for (const { row, decision } of entries.slice(0, limit)) {
    if (decision.kind !== "ambiguous") continue
    out.push(rowLine(row))
    out.push(`      ${decision.why} —`)
    for (const id of decision.candidates) {
      const candidate = rowsById.get(id)
      out.push(
        candidate === undefined
          ? `        ${id} (outside the history read)`
          : `        ${candidate.date}  ${padLeft(money(candidate.amount), 10)}  ` +
              `${pad(candidate.account, 34)}  ${candidate.merchant}`
      )
    }
  }
  if (entries.length > limit) out.push(`    … and ${entries.length - limit} more`)
}

export function report(
  proposals: readonly Proposal[],
  rules: readonly Rule[],
  titles: ReadonlyMap<string, string>,
  options: { readonly limit: number; readonly rows: boolean }
): string {
  const out: string[] = []
  const rowsById = new Map<string, HistoryRow>()
  for (const proposal of proposals) rowsById.set(proposal.row.monarchId, proposal.row)

  const forRule = (rule: Rule): readonly { row: HistoryRow; decision: Decision }[] =>
    proposals.flatMap((p) => {
      const head = p.decided[0]
      return head?.rule === rule ? [{ row: p.row, decision: head.decision }] : []
    })
  const ofKind = (
    entries: readonly { row: HistoryRow; decision: Decision }[],
    kinds: readonly Decision["kind"][]
  ): readonly { row: HistoryRow; decision: Decision }[] =>
    entries.filter((entry) => kinds.includes(entry.decision.kind))

  out.push(`MONARCH RULE PROPOSAL — ${new Date().toISOString()}`)
  out.push(
    `${rules.length} rule(s) against ${proposals.length} transaction(s). Nothing was written.`
  )
  out.push("")
  out.push("WHAT EACH RULE WOULD DO")
  out.push(
    `  ${pad("rule", 26)}  ${pad("outcome", 22)}  ${padLeft("fires", 6)}  ` +
      `${padLeft("ambig", 6)}  ${padLeft("unpair", 6)}  clauses`
  )
  for (const rule of rules) {
    const entries = forRule(rule)
    out.push(
      `  ${pad(rule.name, 26)}  ${pad(outcomeOf(rule, titles), 22)}  ` +
        `${padLeft(String(ofKind(entries, ["categorize", "reserve"]).length), 6)}  ` +
        `${padLeft(String(ofKind(entries, ["ambiguous"]).length), 6)}  ` +
        `${padLeft(String(ofKind(entries, ["unpaired"]).length), 6)}  ${describeClauses(rule)}`
    )
  }
  const unreached = proposals.filter((p) => p.decided.length === 0).map((p) => p.row)
  const several = proposals.filter((p) => p.decided.length > 1)
  out.push(
    `  ${pad("(no rule reached)", 26)}  ${pad("", 22)}  ${padLeft(String(unreached.length), 6)}`
  )
  out.push("")
  out.push(
    `${several.length} transaction(s) were reached by more than one rule. The first decided and ` +
      "the rest were shadowed."
  )

  for (const rule of rules) {
    const entries = forRule(rule)
    const fires = ofKind(entries, ["categorize", "reserve"])
    out.push("")
    out.push(`--- ${rule.name} — ${outcomeOf(rule, titles)} — ${entries.length} decided ---`)
    out.push(`  ${describeClauses(rule)}`)
    if (entries.length === 0) {
      out.push("  nothing in the history matches it")
      continue
    }
    const fired = fires.map((entry) => entry.row)
    if (rule.outcome.kind === "reserve") reserveBlock(fired, options.limit, out)
    else categorizeBlock(rule.outcome.category, fired, titles, options.limit, out)

    const ambiguous = ofKind(entries, ["ambiguous"])
    if (ambiguous.length > 0) ambiguousBlock(ambiguous, rowsById, options.limit, out)
    const unpaired = ofKind(entries, ["unpaired"]).map((entry) => entry.row)
    if (unpaired.length > 0) {
      out.push("")
      out.push(
        `  UNPAIRED — ${unpaired.length}. The rule's own clauses matched and no opposite leg ` +
          "stands inside the window, so nothing fires."
      )
      listRows(unpaired, options.limit, out)
    }
    if (options.rows) {
      out.push("")
      out.push(`  EVERY TRANSACTION IT FIRES ON — ${fires.length}`)
      for (const entry of fires) {
        const paired =
          entry.decision.kind === "categorize" || entry.decision.kind === "reserve"
            ? entry.decision.counterpart
            : null
        out.push(pairedLine(entry.row, paired === null ? undefined : rowsById.get(paired)))
      }
    }
  }

  if (several.length > 0) {
    out.push("")
    out.push(`--- SHADOWED — ${several.length} row(s) reached by more than one rule ---`)
    out.push("  the rule that decided, then the rules it beat")
    for (const [names, count] of tally(
      several.map((p) => p.decided.map((d) => d.rule.name).join(" beats "))
    )) {
      out.push(`  ${padLeft(String(count), 7)}  ${names}`)
    }
  }

  out.push("")
  out.push(`--- WHAT NO RULE REACHED — ${unreached.length} ---`)
  out.push("  the merchants carrying the most of it, as evidence rather than as a proposal")
  out.push(`    ${padLeft("count", 7)}  ${pad("merchant", 40)}  categories standing`)
  const byMerchant = tally(unreached.map((row) => row.merchant)).slice(0, options.limit)
  for (const [merchant, count] of byMerchant) {
    const spread = tally(
      unreached
        .filter((row) => row.merchant === merchant)
        .map((row) => (row.standingCategory === "" ? "(none)" : row.standingCategory))
    )
      .slice(0, 3)
      .map(([name, held]) => `${name} ${held}`)
      .join(", ")
    out.push(`    ${padLeft(String(count), 7)}  ${pad(merchant, 40)}  ${spread}`)
  }
  return out.join("\n")
}
