import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJei = {
  id: "01a0ea88-c43d-7437-baf7-49ddcd4cba8c",
  type: "page-type/lore",
  slug: "otherwhere-xi-jei",
  title: "King Jei",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-jei",
  facts: [
    {
      fact: "Jei was King of Sandsong, a desert kingdom on the western Golden Coast of Vizim.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jei and his queen Naila wrote to Viv for secret help against the invading Sheem.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jei and Naila had a baby daughter, Mimir, sent away by ship as Sandsong fell.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oleander killed Jei and Naila the night after the battle of Barrier; Jei is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
