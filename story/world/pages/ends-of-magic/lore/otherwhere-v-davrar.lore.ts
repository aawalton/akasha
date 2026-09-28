import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDavrar = {
  id: "01a0e9e8-d642-7142-965b-86465a26f55b",
  type: "page-type/lore",
  slug: "otherwhere-v-davrar",
  title: "Davrar",
  world: "world/ends-of-magic",
  about: "world/ends-of-magic",
  facts: [
    {
      fact: "A blue box welcomed Nala to Davrar and said Davrar would help her survive.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "Davrar said it was adapting Nala to the local biosystem and determining her capabilities.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "Davrar's blue boxes hang before the eyes, turn with the head, and are understood as they are read.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
  ],
} as const satisfies Lore
