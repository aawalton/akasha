import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiPendath = {
  id: "01a0ea84-282d-786f-89e0-f5b616d49b2f",
  type: "page-type/lore",
  slug: "otherwhere-xi-pendath",
  title: "Pendath",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-pendath",
  facts: [
    {
      fact: "Pendath headed the majority of Helock's council.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pendath had Viv arrested, on the pretext that she caused the guard officer Semon's death.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv blasted her way out of Helock's town hall keep, killing Pendath's loyalists.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "General Jaratalassi said Pendath had it coming.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Helock's council, once Pendath's, was butchered by hadals this winter.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
