import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { AttributeScores } from "akasha/story/game/entity/properties/attribute-scores.record-property.types.ts"
import type { BaseDamage } from "akasha/story/game/entity/properties/base-damage.number-property.types.ts"
import type { EntityAffinities } from "akasha/story/game/entity/properties/entity-affinities.record-property.types.ts"
import type { EntityBonds } from "akasha/story/game/entity/properties/entity-bonds.record-property.types.ts"
import type { EntityClass } from "akasha/story/game/entity/properties/entity-class.text-property.types.ts"
import type { EntityDice } from "akasha/story/game/entity/properties/entity-dice.relation-property.types.ts"
import type { EntityEquipment } from "akasha/story/game/entity/properties/entity-equipment.record-property.types.ts"
import type { EntityKind } from "akasha/story/game/entity/properties/entity-kind.text-property.types.ts"
import type { EntityLevel } from "akasha/story/game/entity/properties/entity-level.number-property.types.ts"
import type { EntitySkills } from "akasha/story/game/entity/properties/entity-skills.record-property.types.ts"
import type { EntityTitles } from "akasha/story/game/entity/properties/entity-titles.record-property.types.ts"
import type { EntityTraits } from "akasha/story/game/entity/properties/entity-traits.record-property.types.ts"
import type { HoldingGame } from "akasha/story/game/entity/properties/holding-game.relation-property.types.ts"
import type { RevealGate } from "akasha/story/game/entity/properties/reveal-gate.number-property.types.ts"
import type { SheetNote } from "akasha/story/game/entity/properties/sheet-note.text-property.types.ts"
import type { TypicalIntent } from "akasha/story/game/entity/properties/typical-intent.number-property.types.ts"
import type { UnspentAttributePoints } from "akasha/story/game/entity/properties/unspent-attribute-points.number-property.types.ts"

export type GameEntity = Page & {
  title: Title
  game: HoldingGame
  kind: EntityKind
  class?: EntityClass
  level?: EntityLevel
  attributes?: AttributeScores
  traits?: EntityTraits
  titles?: EntityTitles
  skills?: EntitySkills
  affinities?: EntityAffinities
  equipment?: EntityEquipment
  bonds?: EntityBonds
  revealGate?: RevealGate
  note?: SheetNote
  dice?: EntityDice
  baseDamage?: BaseDamage
  typicalIntent?: TypicalIntent
  unspentAttributePoints?: UnspentAttributePoints
}
