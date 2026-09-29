import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveResourceWorld = {
  id: "01a0ea01-2f64-783b-8d99-bb6f109a113f",
  type: "page-type/lore",
  slug: "super-supportive-resource-world",
  title: "Resource worlds",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-resource-world",
  facts: [
    {
      fact: "A resource world supplies people to serve the Artonans under the Contract.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-iii-onn-desveth"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
