import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00072 = {
  id: "01a0fe7c-cc6e-7ed5-be42-826747130573",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-072",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 72,
  stepStatus: "step-status/writer",
  action:
    "“Oh! Inventory sounds useful!” I pull open the skill shop and buy it. “Done! Any other basics I might have missed?”",
  beats: [
    '"Oh! Inventory sounds useful!" Nala calls up the skill shop. A blue window opens before her.',
    "Skills: Spark 3, Mana Bolt 5, Appraise 5, Gust 6, Minor Ward 8, Mend 10, Purify 15.",
    "Traits: Inventory 3.",
    "She picks Inventory. Three glimmerstones fade from her pack.",
    "[New trait acquired – Inventory.]",
    "[Inventory – At [Basic] level, keep a knapsack's worth in a pocket bound to you.]",
    '"Done!" she says. "Any other basics I might have missed?"',
    'Marda snorts. "Appraise, from that same shop."',
    '"A staff of your own. The cooper by the market sells plain ash ones, fifteen copper."',
    '"And never go out with your well dry." She eyes Nala. "Which you are."',
  ],
  lore: [
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-2-2",
    "lore/overwhere-iii-the-system",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
  endsAt: "2026-10-07T11:50:00.000Z",
} as const satisfies StoryTurnPlayed
