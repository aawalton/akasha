import type {
  Field,
  RuleSet,
} from "akasha/alan/harness/rules-engine/modules/rule-conditions/rule-conditions.module.code.ts"
import { z } from "zod"

export const EMAIL_RULE_SET_NAME = "email-rule"

export const EMAIL_RULE_KINDS = ["agent", "code"] as const

export type EmailRuleKind = (typeof EMAIL_RULE_KINDS)[number]

const FIELDS: readonly Field[] = [
  { name: "from", type: "text" },
  { name: "list", type: "text" },
  { name: "subject", type: "text" },
  { name: "to", type: "text" },
]

const EMAIL_RULE_PATH =
  /^(?<holder>[a-z0-9-]+)\/harness\/inbox\/email-rule\/(?<kind>agent|code)\/pages\/(?<slug>[a-z0-9-]+)\.email-rule-\k<kind>\.ts$/

export function ruleFolderIn(person: string, kind: EmailRuleKind): string {
  return `${person}/harness/inbox/email-rule/${kind}/pages`
}

export function ruleTypeSlug(kind: EmailRuleKind): string {
  return `email-rule-${kind}`
}

export function ruleKinds(): readonly EmailRuleKind[] {
  return EMAIL_RULE_KINDS
}

export const EMAIL_RULE_SET: RuleSet = {
  name: EMAIL_RULE_SET_NAME,
  fields: FIELDS,
}

interface RuleLocation {
  readonly person: string
  readonly kind: string
  readonly slug: string
}

const RULE_PATH_GROUPS = z.object({
  holder: z.string(),
  kind: z.string(),
  slug: z.string(),
})

function parseRuleLocation(matched: RegExpExecArray | null): RuleLocation | null {
  if (matched === null) return null
  const said = RULE_PATH_GROUPS.safeParse(matched.groups ?? {})
  if (!said.success) return null
  return { person: said.data.holder, kind: said.data.kind, slug: said.data.slug }
}

export function ruleLocation(relPath: string): RuleLocation | null {
  return parseRuleLocation(EMAIL_RULE_PATH.exec(relPath))
}
