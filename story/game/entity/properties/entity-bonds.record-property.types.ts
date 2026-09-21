import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { BondAttribute } from "akasha/story/game/entity/properties/bond-attribute.relation-property.types.ts"
import type { BondDirection } from "akasha/story/game/entity/properties/bond-direction.text-property.types.ts"
import type { BondGrows } from "akasha/story/game/entity/properties/bond-grows.boolean-property.types.ts"
import type { BoundAttribute } from "akasha/story/game/entity/properties/bound-attribute.relation-property.types.ts"
import type { BoundEntity } from "akasha/story/game/entity/properties/bound-entity.relation-property.types.ts"
import type { EstablishedTurn } from "akasha/story/game/entity/properties/established-turn.number-property.types.ts"
import type { ListedName } from "akasha/story/game/entity/properties/listed-name.text-property.types.ts"
import type { ListedNote } from "akasha/story/game/entity/properties/listed-note.text-property.types.ts"
import type { ListedSource } from "akasha/story/game/entity/properties/listed-source.text-property.types.ts"

export type EntityBonds = List<{
  name: ListedName
  entity: BoundEntity
  direction: BondDirection
  attribute?: BondAttribute
  boundAttribute?: BoundAttribute
  grows?: BondGrows
  establishedTurn?: EstablishedTurn
  note?: ListedNote
  source?: ListedSource
}>
