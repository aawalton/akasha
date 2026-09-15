import type { Constraints } from "akasha/domain/initiative/properties/constraints.standard-agent-english-property.types.ts"
import type { InitiativeParent } from "akasha/domain/initiative/properties/initiative-parent.relation-property.types.ts"
import type { InitiativePersona } from "akasha/domain/initiative/properties/initiative-persona.relation-property.types.ts"
import type { IntentStack } from "akasha/domain/initiative/properties/intent-stack.record-property.types.ts"
import type { PageDomain } from "akasha/domain/properties/page-domain.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Initiative = Page & {
  domain: PageDomain
  persona: InitiativePersona
  parent?: InitiativeParent
  intentStack?: IntentStack
  constraints?: Constraints
}
