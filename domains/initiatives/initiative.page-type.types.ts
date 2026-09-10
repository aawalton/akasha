import type { Page } from "../../pages/page.page-type.types.ts"
import type { PageDomain } from "../properties/page-domain.relation-property.ts"
import type { Constraints } from "./properties/constraints.standard-agent-english-property.ts"
import type { InitiativeParent } from "./properties/initiative-parent.relation-property.ts"
import type { InitiativePersona } from "./properties/initiative-persona.relation-property.ts"
import type { Intents } from "./properties/intents.record-property.ts"

export type Initiative = Page & {
  domain: PageDomain
  persona: InitiativePersona
  parent?: InitiativeParent
  intents?: Intents
  constraints?: Constraints
}
