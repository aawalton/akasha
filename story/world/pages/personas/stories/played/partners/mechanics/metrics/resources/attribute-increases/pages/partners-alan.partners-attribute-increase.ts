import type { PartnersAttributeIncrease } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/metrics/resources/attribute-increases/partners-attribute-increase.page-type.types.ts"

export const partnersAlan = {
  id: "01a0de4a-27a1-7bed-ba03-8355303df21d",
  type: "page-type/partners-attribute-increase",
  slug: "partners-alan",
  character: "character-player/partners-alan",
  value: 1,
  minValue: 0,
} as const satisfies PartnersAttributeIncrease
