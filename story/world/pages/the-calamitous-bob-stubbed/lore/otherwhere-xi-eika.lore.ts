import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEika = {
  id: "01a0ea7f-d849-7363-8a74-c9bef545b0f1",
  type: "page-type/lore",
  slug: "otherwhere-xi-eika",
  title: "Eika",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-eika",
  facts: [
    {
      fact: "Eika was one of the elite champions of Oleander's Kingdom of Maranor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eika died in the final war with most of Maranor's elites; Eika is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:10:42.121Z",
  updatedAt: "2026-09-29T00:10:52.000Z",
} as const satisfies Lore
