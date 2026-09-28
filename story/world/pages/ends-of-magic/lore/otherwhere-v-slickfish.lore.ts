import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSlickfish = {
  id: "01a0e9fa-9426-77de-8780-6c1d964d0d5c",
  type: "page-type/lore",
  slug: "otherwhere-v-slickfish",
  title: "Slickfish",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-slickfish",
  facts: [
    {
      fact: "Slickfish are shellfish fried in oil until they pop and turn bright yellow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cooked slickfish must be eaten quickly before they deliquesce.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
