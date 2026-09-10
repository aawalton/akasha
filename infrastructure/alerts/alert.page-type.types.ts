import type { Definition } from "../../domains/properties/definition.standard-agent-english-property.ts"
import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Person } from "../../seat-system/seats/properties/person.relation-property.ts"
import type { AlertDomain } from "./properties/alert-domain.text-property.ts"
import type { AlertPersona } from "./properties/alert-persona.relation-property.ts"
import type { AlertRoleSlug } from "./properties/alert-role-slug.text-property.ts"
import type { AlertRunbook } from "./properties/alert-runbook.file-property.ts"
import type { AlertSummary } from "./properties/alert-summary.text-property.ts"

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
