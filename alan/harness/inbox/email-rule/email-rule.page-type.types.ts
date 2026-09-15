import type { EmailRuleMatches } from "akasha/alan/harness/inbox/email-rule/properties/email-rule-matches.record-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type EmailRule = Page & {
  title: Title
  matches: EmailRuleMatches
}
