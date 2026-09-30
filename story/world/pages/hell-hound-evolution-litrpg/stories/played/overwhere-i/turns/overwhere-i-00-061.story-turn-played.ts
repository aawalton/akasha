import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00061 = {
  id: "01a0f49d-e0e8-7d98-8053-92d2ce566c6d",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-061",
  ownLength: 112,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 61,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  action:
    "“One more question first. Could I turn it into something to improve my spell casting? Gold I have plenty, but an arcane focus would help quite a bit more.”",
  beats: [
    "Nala asks if the pearl could be made into an arcane focus, to strengthen her spellcasting.",
    "She tells him gold she has plenty; a focus would help her far more.",
    "Osric laughs, loud enough to turn heads at the next table, and calls to Garrick for wine.",
    "He says a Wendlow enchanter, Ilse Varrow, sets such stones for mages, at a rich man's price.",
    "Of what a pearl focus does, he knows only that mages swear by them.",
    "He presses her no more, tips his hat and says his offer stands.",
    '"Two gold and five silver, any time before I leave for Wendlow, the morning after next."',
  ],
  lore: [
    "lore/overwhere-i-greyfen-beasts-2",
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-osric-fenn",
    "place/overwhere-i-wendlow",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/inventory"],
  endsAt: "2026-10-01T18:05:00.000Z",
} as const satisfies StoryTurnPlayed
