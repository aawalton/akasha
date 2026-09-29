import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEranTheMousey = {
  id: "01a0ea81-c5cc-71b2-9b25-0de6f32c1f7c",
  type: "page-type/lore",
  slug: "otherwhere-xi-eran-the-mousey",
  title: "Eran the Mousey",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-eran-the-mousey",
  facts: [
    {
      fact: "Eran the Mousey was one of the elite champions of Oleander's Kingdom of Maranor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eran the Mousey died in the final war with most of Maranor's elites, and is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
