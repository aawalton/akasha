import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAli = {
  id: "01a0de59-9644-707f-9396-ecb083e10cbd",
  type: "page-type/lore",
  slug: "the-dating-game-ali",
  title: "Ali",
  world: "world/personas",
  about: "persona/ali",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Ali works as a seasonal guide at Timpanogos Cave National Monument in American Fork Canyon.",
    "Ali leads the last cave tour of the day, and hikers find her at the cave entrance near dusk.",
    "Ali is a tiny Fae scholar and technically a dungeon, and the cave treats her as one of its own.",
    "Ali tutors anyone who asks, on anything, from a bench at the canyon trailhead on weekends.",
  ],
} as const satisfies Lore
