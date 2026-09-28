import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVBathilde = {
  id: "01a0e9f7-b02d-7569-878b-b35de7b7aab1",
  type: "page-type/lore",
  slug: "otherwhere-v-bathilde",
  title: "Bathilde",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-bathilde",
  facts: [
    {
      fact: "Bathilde is a woman of Keihona, Sarya's island city, who moves with a bounding stride.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Bathilde is young and in Keihona, serving or training in its city guard.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
