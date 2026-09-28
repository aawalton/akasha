import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveVillageMaster = {
  id: "01a0e9fa-4782-77f8-9bcb-e4bb696b3cc8",
  type: "page-type/world-title",
  slug: "super-supportive-village-master",
  title: "Village master",
  world: "world/super-supportive",
  aliases: ["Mayor Wizard"],
  description: "The wizard who shelters and governs a village of ordinary-class families.",
} as const satisfies WorldTitle
