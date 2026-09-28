import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvGrassSea = {
  id: "01a0ea0c-5721-72fc-9bf6-f22803d2539c",
  type: "page-type/place",
  slug: "otherwhere-iv-grass-sea",
  title: "The Grass Sea",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-azure-hills",
  facts: [
    {
      fact: "The Great Grass Sea is a vast, boggy grassland of tall reeds and migratory fish.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Grass Sea runs from Pale Moon Lake City west to the ocean.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Grass Sea borders the Yellow Rock Plateau to the south and the Ash Forest to the north.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Grass Sea is the most populous region of the Azure Hills; millions live in small villages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Grass Sea was once a maze of a hundred thousand rivers and islands; many rivers remain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Countless roads scatter across the Grass Sea toward many sects and villages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Great herds of bison and deer migrate south across the Grass Sea each year for milder winters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fence posts are said to take root and grow in the Grass Sea's fertile soil.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pale Moon Lake City holds about a million people; Grass Sea City is as large or larger.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Green Grass Valley was devastated by the raider Sun Ken, and has since been rebuilt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sun Ken's raid disabled every sentry before Green Grass Valley's guards could respond.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
