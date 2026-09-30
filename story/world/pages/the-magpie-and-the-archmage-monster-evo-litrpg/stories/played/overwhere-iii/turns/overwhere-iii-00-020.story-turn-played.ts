import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00020 = {
  id: "01a0f223-6a62-7e26-a20c-eb30fd7f44d5",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-020",
  ownLength: 124,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 20,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-marda-hesk"],
  stepStatus: "step-status/recorders",
  action:
    "“Not quite Purify yet, but part way there. If you don’t mind a few steps, I think I can finish that off after a rest or two.”",
  beats: [
    '"Not quite Purify yet," Nala says, "but part way there."',
    '"If you don\'t mind a few steps, I think I can finish it off after a rest or two."',
    "Marda sinks back into her chair slowly, still looking at the paler stone.",
    "She takes up the tongs and lays the stone back in the lead box, in a corner apart from the others.",
    "\"That one's yours to come back to, then. I'll not send it to Thornmere.\"",
    'She locks the box and sits back. "Crack it clean, and the glimmerstone that comes out is yours."',
    '"Same for any bounty stone you clean after that."',
    '"Post opens at the dawn bell, shuts at the dusk bell. I\'m at this desk the whole of it."',
  ],
  lore: [
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-nala",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/inventory", "story-recorder/memory"],
  endsAt: "2026-09-30T12:23:00.000Z",
} as const satisfies StoryTurnPlayed
