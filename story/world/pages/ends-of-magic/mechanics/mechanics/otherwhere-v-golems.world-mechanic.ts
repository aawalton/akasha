import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVGolems = {
  id: "01a0e9f6-a23b-75ba-870a-527fc9ea0488",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-golems",
  title: "Golems",
  world: "world/ends-of-magic",
  aliases: ["golem", "enchanted constructs"],
  description: "Magically animated statues and constructs.",
} as const satisfies WorldMechanic
