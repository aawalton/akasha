import type { Act } from "akasha/domain/properties/act.standard-agent-english-property.types.ts"
import type { Aids } from "akasha/domain/properties/aids.standard-agent-english-property.types.ts"
import type { DirectiveKind } from "akasha/domain/properties/directive-kind.relation-property.types.ts"
import type { Name } from "akasha/domain/properties/name.text-property.types.ts"
import type { Warrant } from "akasha/domain/properties/warrant.standard-agent-english-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type Directives = List<{
  directiveKind: DirectiveKind
  name: Name
  act: Act
  warrant: Warrant
  aids: Aids
}>
