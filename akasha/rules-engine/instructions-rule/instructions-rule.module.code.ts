export interface RuleCtx {
  readonly command: string
  readonly where: string
  readonly call: string
}

export function ruleText(value: string | undefined, field: string, ctx: RuleCtx): string {
  if (value === undefined || value.length === 0) {
    throw new Error(
      `${ctx.command}: the rule at ${ctx.where} answered from \`${ctx.call}\` with no ` +
        `\`${field}\`, where this command prints one to the person who has to act on the ` +
        "answer. A sentence supplied from this side would read as the rule's own words while " +
        "saying nothing the rule decided, so the disagreement is refused instead."
    )
  }
  return value
}
