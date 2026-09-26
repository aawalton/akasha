import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"
import type { StageOfPartnersBond } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/bonds/properties/stage-of-partners-bond.relation-property.types.ts"

export type PartnersBond = WorldRelationship & {
  stage: StageOfPartnersBond
}
