import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00031 = {
  id: "01a0e565-d397-7bdd-8e8f-8235d4248bb9",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-031",
  ownLength: 142,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 31,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  turnStatus: "turn-status/writer",
  action:
    "“Already gone”, I say with a sad smile. “But this has been a good batch at least. I mean, I can’t complain about spending time in the dark with a kind and beautiful woman.”",
  beats: [
    'Alan, with a sad smile: "Already gone."',
    '"But this has been a good batch at least."',
    '"I mean, I can\'t complain about spending time in the dark with a kind and beautiful woman."',
    'Grace laughs, low and surprised, at "already gone"; the lantern sways with it.',
    'At "kind and beautiful" she doesn\'t look away or wave it off; she takes it, quietly.',
    '"Thank you," she says, and means it plainly.',
    '"Then I\'ll try to be good company for this batch, and the next few after it."',
    "Dusk is deepening over the cemetery; above the pines the evening star is out.",
    "She turns down the next row, holding the lantern low so its light lies across the path.",
    'She glances back over her shoulder. "The next one\'s welcome to walk with me too."',
  ],
  issues: [
    '"Full dark has come down over the cemetery now" - 030 ends 7:29 PM, minutes past sunset',
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
