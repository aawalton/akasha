import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiFacelessOrder = {
  id: "01a0ea84-a812-746f-87f0-cc35f04d3268",
  type: "page-type/lore",
  slug: "otherwhere-xi-faceless-order",
  title: "The Faceless Order",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-faceless-order",
  facts: [
    {
      fact: "Male Hallurian casters are castrated and bound into the Faceless Order.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Faceless mages' tattoos give their grandmaster control over them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Faceless serve Halluria as war mages and death squads.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Faceless cast the chaos ball, a spell of every hue that breaks constructs.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
