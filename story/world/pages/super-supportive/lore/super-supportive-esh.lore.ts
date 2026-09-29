import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveEsh = {
  id: "01a0ea10-f3f7-7a8e-970d-3712580f05f2",
  type: "page-type/lore",
  slug: "super-supportive-esh",
  title: "Esh",
  world: "world/super-supportive",
  about: "character-other/super-supportive-esh",
  facts: [
    {
      fact: "Esh-erdi is a Knight of the Mother Planet, with close-set dark brown eyes and three long braids.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-iii-onn-desveth"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
