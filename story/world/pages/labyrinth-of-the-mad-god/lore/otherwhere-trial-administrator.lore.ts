import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereTrialAdministrator = {
  id: "01a0e9ce-df77-7f03-9ab8-6b2d9b3a31fb",
  type: "page-type/lore",
  slug: "otherwhere-trial-administrator",
  title: "The Trial Administrator",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "An alpacataur hologram greets guests of the evaluation course on behalf of the tower.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The course's final ranking badge opens the way to employment in the Tower of Rizzen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Administrator is a machine mind whose prime directive is to run its trials.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
