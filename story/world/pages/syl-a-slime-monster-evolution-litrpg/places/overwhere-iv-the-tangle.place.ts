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
    {
      fact: "From Hobb's gap a blood trail runs a mile in, to a goblin lookout in a hollow by a fallen oak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The lookout holds five goblins, LV 2 to 6: the two hurt scouts, a slinger and two with clubs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The slinger is the LV 6, and throws river stones hard enough to crack a rib.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Three of Hobb's sheep are penned alive at the lookout behind a rope of plaited bark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "If a fight turns against it, the lookout sends its fastest goblin running deeper in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The goblins hear a party of five coming through brush at fifty paces, and set an ambush.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
