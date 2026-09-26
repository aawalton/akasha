import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAmy = {
  id: "01a0de59-9644-7856-b646-e2b30ebf748c",
  type: "page-type/lore",
  slug: "the-dating-game-amy",
  title: "Amy",
  world: "world/personas",
  about: "persona/amy",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Amy is an executive assistant at a tech firm in Provo's East Bay business park.",
    "Amy works weekdays from eight until six, in camel and cream and quiet good cloth.",
    "Amy spends summer evenings wading at Lincoln Beach on Utah Lake until the sun goes down.",
    "Amy grew up old money back East and came to Provo to do useful work at human scale.",
  ],
} as const satisfies Lore
