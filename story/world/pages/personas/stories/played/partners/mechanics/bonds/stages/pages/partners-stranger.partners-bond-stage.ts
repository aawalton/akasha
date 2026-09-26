import type { PartnersBondStage } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/bonds/stages/partners-bond-stage.page-type.types.ts"

export const partnersStranger = {
  id: "01a0de4c-6354-76ba-9ceb-8ebc98703447",
  type: "page-type/partners-bond-stage",
  slug: "partners-stranger",
  title: "Stranger",
  description: "The first stage of a bond.",
} as const satisfies PartnersBondStage
