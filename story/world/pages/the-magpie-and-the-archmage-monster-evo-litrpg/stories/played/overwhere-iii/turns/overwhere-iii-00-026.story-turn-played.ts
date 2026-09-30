import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00026 = {
  id: "01a0f35c-fa55-7dff-9534-edecda39c524",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-026",
  ownLength: 139,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 26,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-brannagh-tull",
    "character-other/overwhere-iii-garrick-dole",
    "character-other/overwhere-iii-ivy-marsh",
  ],
  stepStatus: "step-status/writer",
  action: "“I did, but I’m still learning. Did I do something wrong?”",
  beats: [
    '"I did," Nala says, "but I\'m still learning. Did I do something wrong?"',
    'Brannagh snorts. "Wrong? It\'s knit true. Cleaner than my own needle leaves."',
    "She lets go of Nala's wrist and looks at her a long moment. The cat stares too.",
    '"I\'ve two in my back room, bitten by the blighted beasts. Garrick Dole and Ivy Marsh."',
    '"Garrick, the wolf got his calf three weeks back. Ivy, the boar had her hand a fortnight since."',
    "\"Both bites weep black and won't close. There's purple creeping out from them.\"",
    '"They ache and scratch and get weaker every day. Heads still clear, for now."',
    '"I\'ve tried every salve I know on them." She jerks her chin at the curtain behind the counter.',
    '"Look at them for me. Now, tonight. A potion each for your trouble, whatever comes of it."',
  ],
  issues: ['"Nothing I do touches it." - Nobody Acts'],
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-corruption",
    "lore/overwhere-iii-nala",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  endsAt: "2026-09-30T17:47:00.000Z",
} as const satisfies StoryTurnPlayed
