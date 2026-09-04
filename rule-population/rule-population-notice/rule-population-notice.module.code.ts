export interface EmptyRuleLine {
  readonly rule: string
  readonly kind: string
  readonly source: string
  readonly offered: number
}

export interface RulePopulationSweepInput {
  readonly rulesRead: number
  readonly empty: readonly EmptyRuleLine[]
  readonly filesExamined: number
  readonly filesDeclared: number
  readonly blindSpots: readonly string[]
}

export interface RulePopulationNotification {
  readonly text: string
  readonly emptyCount: number
  readonly rulesRead: number
}

export function buildRulePopulationNotification(
  input: RulePopulationSweepInput
): RulePopulationNotification {
  if (input.rulesRead === 0) {
    throw new Error(
      "rule-population sweep read 0 rules — a reading over no rules has the same empty finding list as a healthy one, so nothing may be filed from it"
    )
  }

  const bound =
    `over ${input.rulesRead.toLocaleString()} rule(s), ` +
    `read across ${input.filesExamined.toLocaleString()} of ${input.filesDeclared.toLocaleString()} TS file(s)`

  const head =
    input.empty.length === 0
      ? `rule-population sweep: every rule weighed a population — ${bound}.`
      : `rule-population sweep: ${input.empty.length.toLocaleString()} rule(s) weighed nothing — ${bound}.`

  const lines = [head, ""]
  if (input.empty.length > 0) {
    lines.push(
      "A rule that weighed nothing certifies nothing. Its construct may have been retired out from under it, or its pattern may be written so it never had a population at all — the first wants the rule removed, the second wants it repaired, and only reading it says which.",
      ""
    )
    for (const rule of input.empty) {
      lines.push(
        `  - ${rule.rule} (${rule.kind}, ${rule.source}) — offered ${rule.offered.toLocaleString()} file(s) and weighed none`
      )
    }
    lines.push("")
  }

  lines.push("NOT READ BY THIS SWEEP:")
  for (const spot of input.blindSpots) lines.push(`  - ${spot}`)

  return {
    text: lines.join("\n"),
    emptyCount: input.empty.length,
    rulesRead: input.rulesRead,
  }
}
