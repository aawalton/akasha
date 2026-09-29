import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEasterners = {
  id: "01a0ea7c-d004-7b1a-8667-cc06584fe0fc",
  type: "page-type/lore",
  slug: "otherwhere-xi-easterners",
  title: "Easterners",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-easterners",
  facts: [
    {
      fact: "The easterners have pale bluish skin and light eyes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The easterners live beyond Halluria's eastern isthmus, near the Nemeti's Empire of Dawn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eastern peoples include the Sorelians and the folk of the city of Pranth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The easterners speak a flowing tongue with few throaty sounds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Nemeti conquered many eastern lands and made their folk thralls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Blue-skinned refugees from the isthmus live together in a village in Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The eastern refugees in Harrak grow mushrooms and gourds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
