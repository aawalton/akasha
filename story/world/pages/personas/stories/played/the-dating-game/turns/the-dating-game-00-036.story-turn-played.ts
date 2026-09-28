import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00036 = {
  id: "01a0e58a-4776-7960-a688-ad0ad2f46093",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-036",
  ownLength: 137,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 36,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  turnStatus: "turn-status/recorders",
  action:
    "“Not at the very end. The room was small and his kids were there. I saw him about a week before though. I guess most would consider a few weeks ago to be recent. It feels no different than forty years ago or forty seconds ago to me.”",
  beats: [
    'Alan: "Not at the very end. The room was small and his kids were there."',
    '"I saw him about a week before though."',
    '"I guess most would consider a few weeks ago to be recent."',
    '"It feels no different than forty years ago or forty seconds ago to me."',
    'Grace nods slowly at the small room. "That\'s how it should be, his kids around him."',
    '"And a week before counts. They know who came. I\'ve watched it, over and over."',
    'At "forty years or forty seconds" she looks at him a long moment, taking it in, not arguing it.',
    '"Then I\'ll stop calling it close," she says gently. "It\'s just when it is, for you."',
    'The corner of her red mouth lifts. "Nothing\'s ever far away, for you. I think I like that."',
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
