import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereViiAgnesHobb = {
  id: "01a0eb34-7441-7cc8-88b7-827753f5813c",
  type: "page-type/lore",
  slug: "otherwhere-vii-agnes-hobb",
  title: "Agnes Hobb",
  world: "world/god-of-trash",
  about: "character-other/otherwhere-vii-agnes-hobb",
  facts: [
    {
      fact: "Agnes Hobb is a stout, loud widow of about forty who carries water with a yoke.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agnes's husband, a woodcutter, was gored by the boar in Hobb's Wood this summer and died.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agnes has been sour and hard on newcomers since, and says aloud what others only whisper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agnes has three children and no man's wage; she gleans, spins and takes in washing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agnes resents any stranger taking paid work in Ashford while its own widows go short.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agnes softens only for someone who helps her children, or who speaks of her man with respect.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
