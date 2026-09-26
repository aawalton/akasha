import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type PartnersBondStage = WorldMechanic & {
  title: Title
}
