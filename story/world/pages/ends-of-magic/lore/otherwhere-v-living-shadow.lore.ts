import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLivingShadow = {
  id: "01a0e9fc-3f05-7fc7-9015-e94660578d37",
  type: "page-type/lore",
  slug: "otherwhere-v-living-shadow",
  title: "Living Shadow",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-living-shadow",
  facts: [
    {
      fact: "Living shadows are death elementals shaped like flat black reaching hands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Living shadows project fear, a dark mirror of divine power.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Living shadows hide underground and in ridges, veiled by magic that slips the memory.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Living shadows sense magic rather than seeing with eyes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Living shadows flee from light, and divine light destroys them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Living shadows are among the named dangers of undead blights.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
