import type { Constraints } from "akasha/domains/initiatives/properties/constraints.standard-agent-english-property.types.ts"
import type { InitiativeParent } from "akasha/domains/initiatives/properties/initiative-parent.relation-property.types.ts"
import type { InitiativePersona } from "akasha/domains/initiatives/properties/initiative-persona.relation-property.types.ts"
import type { Intents } from "akasha/domains/initiatives/properties/intents.record-property.types.ts"
import type { PageDomain } from "akasha/domains/properties/page-domain.relation-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type Initiative = Page & {
  domain: PageDomain
  persona: InitiativePersona
  parent?: InitiativeParent
  intents?: Intents
  constraints?: Constraints
}
