import type { Page } from "../../../../pages/page.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { EmailRuleMatches } from "./properties/email-rule-matches.record-property.ts"

export type EmailRule = Page & {
  title: Title
  matches: EmailRuleMatches
}
