import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00082 = {
  id: "01a0ff49-1e90-7378-bbbc-7c0f74a932ff",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-082",
  ownLength: 122,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 82,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/recorders",
  action:
    "“I can take at least two with my skill before they reach us. Who should I target? The hobs?”",
  beats: [
    '"I can take at least two with my skill before they reach us," Nala says.',
    '"Who should I target? The hobs?"',
    '"The hobs," Dace says at once. "Goblins follow the big ones. Drop those and the rest lose heart."',
    '"Merrit, fire on the ford when they\'re in it. Wren, the cottage roof. Orla, behind me."',
    '"Tull, Aldo: hold the fold gate. Keep them off the sheep."',
    "Across the meadow, a shriek goes up from the trees. The torches surge out of the Tangle at a run.",
    "They pour down to the ford, a river of fire on the black water.",
    "In the middle of them, two shapes stand a head taller than the rest: one with a maul, one a spear.",
  ],
  issues: ['"Nothing gets at the sheep." - Nobody Acts'],
  lore: [
    "lore/overwhere-iv-brookside-four-2",
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "lore/overwhere-iv-the-tangle-2",
    "place/overwhere-iv-tull-farm",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/inventory", "story-recorder/memory"],
  endsAt: "2026-10-06T23:57:00.000Z",
} as const satisfies StoryTurnPlayed
