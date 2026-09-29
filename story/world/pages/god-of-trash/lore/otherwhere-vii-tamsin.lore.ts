import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereViiTamsin = {
  id: "01a0ea80-7341-756b-874f-aeffa3b6c09f",
  type: "page-type/lore",
  slug: "otherwhere-vii-tamsin",
  title: "Tamsin",
  world: "world/god-of-trash",
  about: "character-other/otherwhere-vii-tamsin",
  facts: [
    {
      fact: "A girl of about sixteen winnows in Aldo's barn, and laughed out loud when Nala spilled her grain.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-vii-nala",
        "character-other/otherwhere-vii-tamsin",
      ],
    },
  ],
} as const satisfies Lore
