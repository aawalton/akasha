import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSekur = {
  id: "01a0ea85-0b86-7c46-b0a5-0bd60cb8e354",
  type: "page-type/lore",
  slug: "otherwhere-xi-sekur",
  title: "Sekur",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sekur",
  facts: [
    {
      fact: "Sekur is a loud young kark warband leader who fought with Marruk's rebels in Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sekur came to Kazar with Marruk's kark after Viv freed them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Sekur is among the kark who fought for the alliance.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
