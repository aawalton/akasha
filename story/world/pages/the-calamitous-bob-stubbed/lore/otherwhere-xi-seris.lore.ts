import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSeris = {
  id: "01a0ea86-00cd-7edd-9111-232355a466d0",
  type: "page-type/lore",
  slug: "otherwhere-xi-seris",
  title: "Seris",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-seris",
  facts: [
    {
      fact: "Lady Seris is a knight of the Blue Rose, New Harrak's order of knights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Seris is humorless, a rare trait among the poetry-loving Blue Rose knights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Seris rides with the Blue Rose knights under Ser Rollo.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
