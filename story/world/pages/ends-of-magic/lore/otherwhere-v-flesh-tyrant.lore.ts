import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVFleshTyrant = {
  id: "01a0e9fc-3f04-7357-a6d6-0f1657dee4f0",
  type: "page-type/lore",
  slug: "otherwhere-v-flesh-tyrant",
  title: "Flesh Tyrant",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-flesh-tyrant",
  facts: [
    {
      fact: "Flesh tyrants are among the named dangers of undead blights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flesh tyrants are thought to shape a blight's monsters out of undead flesh.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
