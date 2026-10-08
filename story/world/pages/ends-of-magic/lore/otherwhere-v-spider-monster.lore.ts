import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSpiderMonster = {
  id: "01a0e9ff-2b3d-72fb-bc18-f9c0c343ac39",
  type: "page-type/lore",
  slug: "otherwhere-v-spider-monster",
  title: "Spider Monster",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-spider-monster",
  facts: [
    {
      fact: "Dream magic merged with wizardry can mutate an implanted person into a spider monster.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:50:09.213Z",
  updatedAt: "2026-09-28T21:50:19.000Z",
} as const satisfies Lore
