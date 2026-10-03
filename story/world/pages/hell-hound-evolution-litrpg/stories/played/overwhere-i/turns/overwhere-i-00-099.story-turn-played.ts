import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00099 = {
  id: "01a0ff15-38c5-7fe7-8500-861f1de05d6f",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-099",
  ownLength: 236,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 99,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala", "character-other/overwhere-i-harl-voss"],
  stepStatus: "step-status/game-master",
  action:
    "“I’m level 10 now. I was 7 when I met Voss. 4 when I went after the wolves. I know, I’m mad and driving for an early grave, but I got the job done.” I tell her with a manic smile. “Didn’t know Voss was 24, but that explains why he took so much killing. He was harder to kill on his own than they entire wolf pack.”",
  beats: [
    '"I\'m level 10 now. I was 7 when I met Voss. 4 when I went after the wolves," Nala says.',
    '"I know, I\'m mad and driving for an early grave, but I got the job done," she adds, grinning wild.',
    '"Didn\'t know Voss was 24, but that explains why he took so much killing."',
    '"He was harder to kill on his own than the entire wolf pack."',
    'Grete gives one short laugh. "The march has a use for mad ones. Gods know it\'s short of them."',
    "Four to ten in a handful of days: she nods, as if that is just what killing far above you does.",
    "She stoops, unlocks an iron strongbox under the counter, and pulls a ledger toward her.",
    '"I\'ll need a name for the receipt," she says, pen poised.',
    '"My Analyze shows none for you. What do I write?"',
  ],
  issues: [
    '"4 when I went after the wolves" - Nala reached Level 5 on day 2, before the day-3 wolf hunt',
    '"I was 7 when I met Voss" - Nala reached Level 8 at the pine island on day 4, before the quarry',
    '"My Analyze shows none for you." - Plain Negation',
  ],
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "place/overwhere-i-wendlow"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  endsAt: "2026-10-05T12:20:00.000Z",
} as const satisfies StoryTurnPlayed
