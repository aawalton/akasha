import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00035 = {
  id: "01a0e584-562f-7e6b-9595-c7b4a7d9bb46",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-035",
  ownLength: 153,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 35,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  turnStatus: "turn-status/recorders",
  action:
    "“My grandfather, my father’s father, he just passed a few weeks ago. Last one of my grandparents to go, all of them lived to their late 80’s or 90’s. He was 97. First one in his direct line to live past 45, as far back as he could track. Never thought he’d live that long. Didn’t want to for the last ten years, but made peace with it in the end.”",
  beats: [
    'Alan: "My grandfather, my father\'s father, he just passed a few weeks ago."',
    "\"Last one of my grandparents to go, all of them lived to their late 80's or 90's.\"",
    '"He was 97. First one in his direct line to live past 45, as far back as he could track."',
    "\"Never thought he'd live that long. Didn't want to for the last ten years,\"",
    '"but made peace with it in the end."',
    'Grace\'s steps slow at "a few weeks ago." "I\'m sorry," she says softly. "That\'s still so close."',
    '"Ninety-seven," she says, with something like wonder. "Past every one of them before him."',
    "She walks a few paces in silence, the lantern light moving over the stones.",
    '"Making peace at the end," she says. "That\'s the thing I hope for, for everyone I sit with."',
    '"Not everyone gets there. He did."',
    'She looks over at him, gentle. "Were you with him, at the end?"',
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
