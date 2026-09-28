import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00064 = {
  id: "01a0e817-d248-7ff8-ab6f-f1b874b2a9d7",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-064",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 64,
  turnStatus: "turn-status/writer",
  action:
    "**Okay, I'm not comfortable opening to patrons with this many books on the floor. I'll keep working on that and we'll open when at least these shelves are clean. Let me know if I find more books to speed up the process.** I continue working through the piles through the afternoon.",
  beats: [
    "Nala tells Links she won't open with books heaped all over; they open when these shelves are clean.",
    "She asks him to say if she lays hands on another book that would speed things.",
    'Links: "Your Library now. Your call. I\'ll shout."',
    "She reaches for Shelf Sight, and it opens bright and wide, every right shelf blazing clear.",
    "For an hour she moves fast, heap to shelf and back, the stacks by the columns shrinking.",
    "When the sight fades she reaches again, and it sputters out; a hot sting stabs behind her eyes.",
    "She tries once more; it takes, but a pounding headache rides along with it for the hour.",
    "She works through it, slower, squinting, until it fades.",
    "The fourth time, the sight opens clean and bright again, and her pace picks back up.",
    "Partway through, a window opens: Synchronization Requested. Proceed to the core.",
    "Later, another: Library Power: 100 / 100, Stores Full.",
    "Overhead, the hall's gold light begins to sink toward evening amber.",
    'Links: "Full. First time in centuries. Anything more you shelve pours out along the ley lines."',
  ],
} as const satisfies StoryTurnPlayed
