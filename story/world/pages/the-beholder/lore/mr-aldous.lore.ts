import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const mrAldous = {
  id: "01a0ddf8-63fd-73fc-b1e1-46e9dc9adacd",
  type: "page-type/lore",
  slug: "mr-aldous",
  title: "Mr. Aldous",
  world: "world/the-beholder",
  about: "character-other/the-beholder-mr-aldous",
  facts: [
    {
      fact: "Mr. Aldous is a patron of the theatre company who funds half the season.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mr. Aldous sought Pearl out backstage during the bows.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mr. Aldous looks at the dancers like a man at a buffet who's been told not to touch.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mr. Aldous does not look at Pearl that way.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pearl reads herself as too pretty to be staff and too sweet to be prey to men like Mr. Aldous.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mr. Aldous pressed an unrequested glass of gold liquor into Pearl's hand.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mr. Aldous told Pearl she was the only honest face backstage, who just wants them to do well.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mr. Aldous's breath is like oak and money.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pearl charmed Mr. Aldous with a touch on the sleeve, an instance of her Allure.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pearl noted Mr. Aldous's magnificent watch.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mr. Aldous had no idea what was beside him in Pearl.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
