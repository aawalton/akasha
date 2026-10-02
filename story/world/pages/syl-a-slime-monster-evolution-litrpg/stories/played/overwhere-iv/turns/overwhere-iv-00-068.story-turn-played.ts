import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00068 = {
  id: "01a0fe51-65b8-77f1-9e4d-7c3f44f59b64",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-068",
  ownLength: 122,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 68,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/reviewers",
  action:
    "“Yes, please. I have a feeling a crossbar will save my life someday. Can you get it done today?”",
  beats: [
    '"Yes, please. I have a feeling a crossbar will save my life someday. Can you get it done today?"',
    '"Within the hour," Tobin says. "Simple work. Wait, if you like."',
    "Nala sets twenty copper on the bench. This time he counts it at once.",
    "He cuts a short iron bar, heats it, and draws its ends round on the anvil.",
    "A collar goes on behind the socket, hammered snug. The bar slides through it, and he peens it fast.",
    "Two hands wide, ends rounded, set crosswise just behind the leaf blade.",
    "He quenches it in the trough with a hiss and a gout of steam, and wipes it down.",
    "Then he holds the spear out to her, butt first.",
    '"There. Nothing\'ll climb that."',
  ],
  issues: [
    '"Simple work." - prose leaves out the beat\'s "Wait, if you like."',
    '"A beast won\'t climb past that." - the beat has Tobin say "Nothing\'ll climb that."',
  ],
  lore: [
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "place/overwhere-iv-millbrook-smithy",
  ],
  reviewedBy: ["story-reviewer/continuity"],
  endsAt: "2026-10-05T10:58:00.000Z",
} as const satisfies StoryTurnPlayed
