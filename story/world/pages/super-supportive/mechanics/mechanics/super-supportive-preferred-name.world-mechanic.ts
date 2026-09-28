import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportivePreferredName = {
  id: "01a0e9f9-1fa4-7a90-93f0-46964dddc652",
  type: "page-type/world-mechanic",
  slug: "super-supportive-preferred-name",
  title: "Preferred name",
  world: "world/super-supportive",
  aliases: ["momentary names"],
  description:
    "A name an Avowed asks the System to call them, which can differ by place, person or situation.",
} as const satisfies WorldMechanic
