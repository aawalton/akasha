import type { Act } from "akasha/domains/properties/act.standard-agent-english-property.types.ts"
import type { Aids } from "akasha/domains/properties/aids.standard-agent-english-property.types.ts"
import type { DirectiveKind } from "akasha/domains/properties/directive-kind.relation-property.types.ts"
import type { Name } from "akasha/domains/properties/name.text-property.types.ts"
import type { Warrant } from "akasha/domains/properties/warrant.standard-agent-english-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Directives = List<{
  directiveKind: DirectiveKind
  name: Name
  act: Act
  warrant: Warrant
  aids: Aids
}>
