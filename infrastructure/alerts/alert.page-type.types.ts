import type { Person } from "akasha/agents/seats/properties/person.relation-property.types.ts"
import type { Definition } from "akasha/domains/properties/definition.standard-agent-english-property.types.ts"
import type { AlertDomain } from "akasha/infrastructure/alerts/properties/alert-domain.text-property.types.ts"
import type { AlertPersona } from "akasha/infrastructure/alerts/properties/alert-persona.relation-property.types.ts"
import type { AlertRoleSlug } from "akasha/infrastructure/alerts/properties/alert-role-slug.text-property.types.ts"
import type { AlertRunbook } from "akasha/infrastructure/alerts/properties/alert-runbook.file-property.types.ts"
import type { AlertSummary } from "akasha/infrastructure/alerts/properties/alert-summary.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type Alert = Page & {
  title: Title
  definition: Definition
  domain?: AlertDomain
  summary?: AlertSummary
  person?: Person
  runbook?: AlertRunbook
  persona?: AlertPersona
  roleSlug?: AlertRoleSlug
}
