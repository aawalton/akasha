import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVVerification = {
  id: "01a0e9fc-f7ce-7f0a-9c38-4cb65f5e166d",
  type: "page-type/lore",
  slug: "otherwhere-v-verification",
  title: "Verification",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-verification",
  facts: [
    {
      fact: '"Verified truth" is a common saying for a claim beyond doubt.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A claim Davrar confirms is called verified truth, or Davrar's truth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kills and deeds recorded in Davrar's boxes can be verified to others.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
