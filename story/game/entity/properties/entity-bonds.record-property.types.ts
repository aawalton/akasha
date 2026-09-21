import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { BondAttribute } from "akasha/story/game/entity/properties/bond-attribute.relation-property.types.ts"
import type { BondDirection } from "akasha/story/game/entity/properties/bond-direction.text-property.types.ts"
import type { BondGrows } from "akasha/story/game/entity/properties/bond-grows.boolean-property.types.ts"
import type { BoundAttribute } from "akasha/story/game/entity/properties/bound-attribute.relation-property.types.ts"
import type { BoundEntity } from "akasha/story/game/entity/properties/bound-entity.relation-property.types.ts"
import type { EstablishedTurn } from "akasha/story/game/entity/properties/established-turn.number-property.types.ts"
import type { SheetName } from "akasha/story/game/entity/properties/sheet-name.text-property.types.ts"
import type { SheetNote } from "akasha/story/game/entity/properties/sheet-note.text-property.types.ts"
import type { SheetSource } from "akasha/story/game/entity/properties/sheet-source.text-property.types.ts"

export type EntityBonds = List<{
  name: SheetName
  entity: BoundEntity
  direction: BondDirection
  attribute?: BondAttribute
  boundAttribute?: BoundAttribute
  grows?: BondGrows
  establishedTurn?: EstablishedTurn
  note?: SheetNote
  source?: SheetSource
}>
