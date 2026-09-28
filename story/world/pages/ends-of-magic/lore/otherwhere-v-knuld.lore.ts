import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVKnuld = {
  id: "01a0e9f4-0047-7c65-bc2b-b122456fb6cd",
  type: "page-type/lore",
  slug: "otherwhere-v-knuld",
  title: "Knuld",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-knuld",
  facts: [
    {
      fact: "Knulds are a short people with orange skin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Knulds are seen among the many peoples of the city of Keihona.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Knuld corpses rise among the undead that roam blighted lands.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
