import type { PartnersBond } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/bonds/partners-bond.page-type.types.ts"

export const partnersAmy = {
  id: "01a0de4c-6353-7ea4-bfc6-fd25db7b1c32",
  type: "page-type/partners-bond",
  slug: "partners-amy",
  title: "Alan and Amy",
  characters: ["character-player/partners-alan", "character-other/partners-amy"],
  relationshipPoints: 130,
  stage: "partners-bond-stage/partners-confidant",
} as const satisfies PartnersBond
