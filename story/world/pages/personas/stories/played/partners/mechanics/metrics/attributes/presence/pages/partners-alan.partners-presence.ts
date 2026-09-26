import type { PartnersPresence } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/metrics/attributes/presence/partners-presence.page-type.types.ts"

export const partnersAlan = {
  id: "01a0de4a-27a1-7dbf-81da-702ec907991c",
  type: "page-type/partners-presence",
  slug: "partners-alan",
  character: "character-player/partners-alan",
  value: 2,
} as const satisfies PartnersPresence
