import type { Field, RuleSet } from "@akasha/rules-engine/rule-conditions"

export const EMAIL_RULE_SET = "email-rule"

export const EMAIL_RULE_KINDS = ["agent", "code"] as const

export type EmailRuleKind = (typeof EMAIL_RULE_KINDS)[number]

const FIELDS: readonly Field[] = [
  { name: "from", type: "text", values: [], filler: "someone@unnamed." },
  { name: "list", type: "text", values: [] },
  { name: "subject", type: "text", values: [] },
  { name: "to", type: "text", values: [], filler: "someone@unnamed." },
]

export const EMAIL_RULE_PATH =
  /^(?<holder>[a-z0-9-]+)\/harness\/inboxes\/email-rules\/email-rule-(?<kind>agent|code)s\/pages\/(?<slug>[a-z0-9-]+)\.email-rule-\k<kind>\.ts$/

export function ruleFolderIn(person: string, kind: EmailRuleKind): string {
  return `${person}/harness/inboxes/email-rules/email-rule-${kind}s/pages`
}

export function ruleFileSuffix(kind: EmailRuleKind): string {
  return `.email-rule-${kind}.ts`
}

export function ruleKinds(): readonly EmailRuleKind[] {
  return EMAIL_RULE_KINDS
}

export function ruleFolderOf(person: string): string {
  return EMAIL_RULE_KINDS.map((kind) => ruleFolderIn(person, kind)).join(" and ")
}

export const emailRuleSet: RuleSet = {
  name: EMAIL_RULE_SET,
  fields: FIELDS,
  path: EMAIL_RULE_PATH,
  normalizer: null,
  kinds: {
    agent: { glob: `${ruleFolderIn("*", "agent")}/*${ruleFileSuffix("agent")}` },
    code: { glob: `${ruleFolderIn("*", "code")}/*${ruleFileSuffix("code")}` },
  },
}

export interface RuleLocation {
  readonly person: string
  readonly kind: string
  readonly slug: string
}

export function ruleLocation(relPath: string): RuleLocation | null {
  const found = EMAIL_RULE_PATH.exec(relPath)
  if (found === null) return null
  const groups: Record<string, string | undefined> = found.groups ?? {}
  return { person: groups.holder ?? "", kind: groups.kind ?? "", slug: groups.slug ?? "" }
}
