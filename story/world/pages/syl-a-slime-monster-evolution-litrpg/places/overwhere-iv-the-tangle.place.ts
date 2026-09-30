import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvTheTangle = {
  id: "01a0ed2c-b995-7c0c-b59c-a23eccdfc4c6",
  type: "page-type/place",
  slug: "overwhere-iv-the-tangle",
  title: "The Tangle",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The Tangle is an old forest a mile west of Millbrook, across the brook.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its oaks and yews grow close and dark, with thick undergrowth and few paths.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Greyback wolves of LV 5 to 9 hunt in packs in the Tangle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wild boar root in the Tangle's hollows, and hunters take them in autumn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A goblin tribe lives in the Tangle and has grown bold, raiding sheep from the farms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The goblins are led by a hobgoblin chief called Grakk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Goblins out of the Tangle have been taking sheep from the edge farms this month.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-garrett-pell",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
