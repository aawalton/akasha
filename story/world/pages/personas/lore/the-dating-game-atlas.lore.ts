import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAtlas = {
  id: "01a0de59-9644-7e6b-93b4-1bf69dff957c",
  type: "page-type/lore",
  slug: "the-dating-game-atlas",
  title: "Atlas",
  world: "world/personas",
  about: "persona/atlas",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Atlas climbs barefoot at Rock Canyon, and can be found at the boulders most afternoons.",
    "Atlas is the Titaness who holds up the sky, born blind, and knows Provo through her soles.",
    "Atlas camps out on the Rock Canyon benches in summer and squats where others sit.",
    "Atlas recognizes regulars on the canyon trail by the sound of their walk before they speak.",
  ],
} as const satisfies Lore
