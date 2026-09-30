import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00015 = {
  id: "01a0f1b4-b972-750a-a264-08a39a7548b3",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-015",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 15,
  stepStatus: "step-status/game-master",
  action:
    "“I’ll stay until I get bored. I hear there are some other beasties nearby that you might prefer to be rid of, and I’m a big fan spending gold. Is there a nice inn here? I could really use a good meal and a bath. Oh! And some new clothes, and a pack, and some shoes, and maybe someone I could hire to turn the hide into a nice rug or blanket? That could be fun.”",
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-garrick-pell",
    "lore/overwhere-i-hessa-vane",
    "lore/overwhere-i-the-western-march",
    "place/overwhere-i-fenwatch",
  ],
  endsAt: "2026-09-29T16:30:00.000Z",
} as const satisfies StoryTurnPlayed
