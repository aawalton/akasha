import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00105 = {
  id: "01a0ff75-cd53-72f7-9c82-8c5bd76be567",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-105",
  ownLength: 167,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 105,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/reviewers",
  action: "“Eh, just the second pearl for now, range should cover what I need most.”",
  beats: [
    '"Eh, just the second pearl for now. Range should cover what I need most," Nala says.',
    'Ilse nods. "Ten gold all told. Five now, with your pearl, and five when I hand it over."',
    "Nala counts five gold onto the counter and sets the drake-pearl beside it.",
    "Ilse sweeps both into a felt-lined box and snaps the lid.",
    "She loops a twist of wire around Nala's finger, pinches it to size, and tags it.",
    "From a drawer she takes a stamped tin claim tag and presses it into Nala's palm.",
    '"Afternoon of day eleven. Bring the tag and the other five, and the ring\'s yours."',
  ],
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "lore/overwhere-i-wendlow-2"],
  reviewedBy: ["story-reviewer/style"],
  endsAt: "2026-10-05T13:15:00.000Z",
} as const satisfies StoryTurnPlayed
