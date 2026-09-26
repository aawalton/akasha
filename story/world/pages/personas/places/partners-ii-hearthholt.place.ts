import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const partnersIiHearthholt = {
  id: "01a0ddf4-cb0a-7d7a-af78-4d22dcea0b22",
  type: "page-type/place",
  slug: "partners-ii-hearthholt",
  title: "Hearthholt",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Hearthholt is an old hearth-manor at the edge of the wild.",
    "Hearthholt chose Alan, the way such places choose their own.",
    "Hearthholt's high eastern-gable window lit itself as Alan crossed into Aravel.",
    "Hearthholt sits up a switchback from a fork in the road, behind an iron gate.",
    "Hearthholt is in far better repair than an empty house should be.",
    "Hearthholt's gutters are clean and its chimneys swept.",
    "Amy Laurens had only ever known Hearthholt's gate locked.",
    "Companions not out adventuring live at Hearthholt and pursue their own lives there.",
  ],
} as const satisfies Place
