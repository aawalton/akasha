import type { EmailRuleMatches } from "akasha/alan/harness/inboxes/email-rules/properties/email-rule-matches.record-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type EmailRule = Page & {
  title: Title
  matches: EmailRuleMatches
}
