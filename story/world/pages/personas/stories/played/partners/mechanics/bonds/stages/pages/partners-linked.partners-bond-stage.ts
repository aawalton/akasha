import type { PartnersBondStage } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/bonds/stages/partners-bond-stage.page-type.types.ts"

export const partnersLinked = {
  id: "01a0de4c-6354-7899-b7cd-eea530e41159",
  type: "page-type/partners-bond-stage",
  slug: "partners-linked",
  title: "Linked",
  description: "The last stage of a bond, reached at 300 bond points and an explicit mutual yes.",
} as const satisfies PartnersBondStage
