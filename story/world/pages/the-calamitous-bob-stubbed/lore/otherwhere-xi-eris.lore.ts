import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEris = {
  id: "01a0ea7f-1ca7-7cda-8f23-3f685d6c9296",
  type: "page-type/lore",
  slug: "otherwhere-xi-eris",
  title: "Eris",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-eris",
  facts: [
    {
      fact: "Eris is a silverite war golem, one of the children Solfis made after his restoration.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eris fights with a giant halberd.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eris was with Solfis at the taking of Frostway, and fought the Nemeti fleet at Grand Beach.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Eris serves New Harrak, back from the final war with her golem siblings.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
