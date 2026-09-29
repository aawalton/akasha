import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDivineSpark = {
  id: "01a0ea82-7963-7f88-94db-5762df97c6b8",
  type: "page-type/lore",
  slug: "otherwhere-xi-divine-spark",
  title: "Divine Spark",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-mechanic/otherwhere-xi-divine-spark",
  facts: [
    {
      fact: "A divine spark is a fragment of a god's own power lodged in a mortal soul.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A divine spark is named by its god's domain, such as luck.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A god can recognize another god's spark in a mortal's soul, as a mark of that god.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
