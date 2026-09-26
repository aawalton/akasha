import type { PartnersBond } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/bonds/partners-bond.page-type.types.ts"

export const partnersAelwyn = {
  id: "01a0de4c-6352-78b0-bdbf-2c21d7a6255d",
  type: "page-type/partners-bond",
  slug: "partners-aelwyn",
  title: "Alan and Aelwyn",
  characters: ["character-player/partners-alan", "character-other/partners-aelwyn"],
  relationshipPoints: 19,
  stage: "partners-bond-stage/partners-stranger",
} as const satisfies PartnersBond
