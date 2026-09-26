import type { Characters } from "akasha/story/character/properties/characters.multi-relation-property.types.ts"
import type { RelationshipPoints } from "akasha/story/world/mechanics/relationships/properties/relationship-points.number-property.types.ts"
import type { WorldRelationshipLevel } from "akasha/story/world/mechanics/relationships/properties/world-relationship-level.computed-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldRelationship = WorldMechanic & {
  characters: Characters
  relationshipPoints?: RelationshipPoints
  relationshipLevel?: WorldRelationshipLevel
}
