import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVAlthorn = {
  id: "01a0e9f7-46c8-78db-bae1-f76555b75852",
  type: "page-type/lore",
  slug: "otherwhere-v-althorn",
  title: "Althorn",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-althorn",
  facts: [
    {
      fact: "Althorn is a human soldier of Esebus who flies patrol in a winged armature.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Althorn serves in Esebus's patrols on that far continent.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
