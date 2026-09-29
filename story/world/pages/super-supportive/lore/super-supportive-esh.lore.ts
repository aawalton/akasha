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
    {
      fact: "Esh-erdi is not on Earth now; he is off-world, beyond a consulate's easy reach.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-iii-onn-desveth",
        "character-player/otherwhere-iii-nala",
      ],
    },
    {
      fact: "He and Lind-otta come to Earth later this year, to back up the demon fight at Matadero.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nala told Onn-desveth that Esh-erdi should come to Earth soon for his inesvul.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-iii-nala",
        "character-other/otherwhere-iii-onn-desveth",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
