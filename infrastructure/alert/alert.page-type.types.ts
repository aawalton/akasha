import type { Person } from "akasha/agent/seat/properties/person.relation-property.types.ts"
import type { Definition } from "akasha/domain/properties/definition.standard-agent-english-property.types.ts"
import type { AlertDomain } from "akasha/infrastructure/alert/properties/alert-domain.text-property.types.ts"
import type { AlertPersona } from "akasha/infrastructure/alert/properties/alert-persona.relation-property.types.ts"
import type { AlertRoleSlug } from "akasha/infrastructure/alert/properties/alert-role-slug.text-property.types.ts"
import type { AlertRunbook } from "akasha/infrastructure/alert/properties/alert-runbook.file-property.types.ts"
import type { AlertSummary } from "akasha/infrastructure/alert/properties/alert-summary.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

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
