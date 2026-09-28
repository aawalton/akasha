import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVHollowbell = {
  id: "01a0ea09-85c7-7e0f-bf98-7e67a018ca19",
  type: "page-type/lore",
  slug: "otherwhere-v-hollowbell",
  title: "Hollowbell",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-hollowbell",
  facts: [
    {
      fact: "Hollowbell is a low herb with round silver-green leaves and nodding pale blue bell flowers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hollowbell grows only beside cold, clean springs in the deep wood, and is rare.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hollowbell grows thickest in a ring around the spring at Fern Hollow, among the roots.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hollowbell leaves, chewed or pounded to a poultice, clean wounds and draw out poison.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A bitter tea of hollowbell eases fever and settles a poisoned stomach.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hollowbell is safe to eat raw, though bitter; it is no food.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Picked hollowbell keeps its strength a month; dried, it is half as strong.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Healers pick hollowbell by pinching off leaves and leave the roots to regrow.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
