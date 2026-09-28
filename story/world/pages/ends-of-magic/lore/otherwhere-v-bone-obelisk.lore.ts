import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVBoneObelisk = {
  id: "01a0e9fc-3f03-7081-a89d-69baf751b9ae",
  type: "page-type/lore",
  slug: "otherwhere-v-bone-obelisk",
  title: "Bone Obelisk",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-bone-obelisk",
  facts: [
    {
      fact: "The obelisks of bone are among the named dangers of undead blights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Even seasoned Questors such as Brox fear the obelisks of bone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The obelisks of bone bear crystals that can be shot down.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
