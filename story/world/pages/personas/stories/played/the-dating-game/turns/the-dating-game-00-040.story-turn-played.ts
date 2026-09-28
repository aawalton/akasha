import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00040 = {
  id: "01a0e7b9-81ef-7e20-847e-57e3989ad7e5",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-040",
  ownLength: 132,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 40,
  prose: "txt",
  characters: ["character-player/the-dating-game-alan"],
  turnStatus: "turn-status/recorders",
  action:
    "In the morning, I wake up and go through my normal routine, then decide to go to the Provo Rec Center to work out.",
  beats: [
    "Sunday morning, Alan wakes on his own, no alarm, and goes through his normal routine.",
    "Breakfast at the table by the back window, cocoa in his one mug, the valley bright to the west.",
    "Then he gets ready and heads out across town to the Provo Recreation Center, west of downtown.",
    "The streets are Sunday-quiet; families in church clothes walk to meetinghouses in the sun.",
    "He reaches the Rec Center at 320 West 500 North and finds its lot empty.",
    "The front doors are locked.",
    "A sign on the glass gives the hours: Monday to Saturday, 5 AM to 10 PM. Closed Sundays.",
  ],
  issues: ['"the lobby lies dim and still, the whole building shut for the day" - Leave It Open'],
  lore: ["place/the-dating-game-provo-recreation-center"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
} as const satisfies StoryTurnPlayed
