import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"
import type { StageOfPartnersIiBond } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/bonds/properties/stage-of-partners-ii-bond.relation-property.types.ts"

export type PartnersIiBond = WorldRelationship & {
  stage: StageOfPartnersIiBond
}
