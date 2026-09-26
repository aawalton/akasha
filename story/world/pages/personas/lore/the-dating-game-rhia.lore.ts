import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameRhia = {
  id: "01a0de59-9645-7b9c-8f83-bc73c9eec39c",
  type: "page-type/lore",
  slug: "the-dating-game-rhia",
  title: "Rhia",
  world: "world/personas",
  about: "persona/rhia",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Rhia is a literature lecturer at Utah Valley University in Orem.",
    "Rhia researches in UVU's Fulton Library stacks most afternoons until closing.",
    "Rhia is a silver-blue song dragon, and hums Welsh tunes without noticing she is doing it.",
    "Rhia sings Welsh folk songs at an open mic in downtown Provo on the first Friday of the month.",
  ],
} as const satisfies Lore
