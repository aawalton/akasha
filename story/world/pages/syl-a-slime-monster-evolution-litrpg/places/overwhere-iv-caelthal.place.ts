import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvCaelthal = {
  id: "01a0ed28-ed1c-7270-a502-2dc34b4cc7b4",
  type: "page-type/place",
  slug: "overwhere-iv-caelthal",
  title: "Caelthal",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Caelthal is the elven capital, a city grown into one enormous tree.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tree of Caelthal is larger than the floating island of Glimmerock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its halls and homes are grown from living wood rather than built.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Caelthal is the hub of the elven waypoint network, with a gate to every grove.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The great spirit of Caelthal lives in the tree and can speak with lesser tree spirits.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Every true elven hometree is tied to Caelthal, and a severed tree loses that link.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The high elven court sits in Caelthal and keeps truthseekers and oathbound guards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Few humans ever enter Caelthal, and elves there regard outsiders with cool suspicion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Llewel of the Feirelles is kept busy at the Caelthal court on council matters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The court is weighing evidence against the Dornhallows, slowly as ever.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
