import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAspectOfTheGuardian = {
  id: "01a0ea8c-6dbd-73f3-9c4c-69881b5b4abd",
  type: "page-type/lore",
  slug: "otherwhere-xi-aspect-of-the-guardian",
  title: "Aspect of the Guardian",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-aspect/otherwhere-xi-aspect-of-the-guardian",
  facts: [
    {
      fact: "The Aspect of the Guardian is the first of an elemental's four aspects, and it is defensive.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is listed among active skills once becoming elemental unlocks it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In it, shields are twice as strong and five times as large.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Guardian cannot move while the aspect holds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In time it deepens into the True Aspect of the Guardian.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
