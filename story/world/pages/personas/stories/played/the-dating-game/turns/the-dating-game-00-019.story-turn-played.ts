import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00019 = {
  id: "01a0e393-a07a-7840-b8b4-26277498779c",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-019",
  cover: "image/image-036776e69642ef48",
  coverAfter: "In the booth Echo goes pink all the way to the ears",
  ownLength: 218,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 19,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "\"That was amazing! That was the best narration I've heard of anything ever, and I'm not even exaggerating to make a point. I mean, you've had way longer to practice than anyone else, and I'm sure your curse made it so you had to practice whether you wanted to or not, which sucks. But what a blessing for your narrative skills. I could listen to you all day.\"",
  beats: "jsonl",
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T12:02:00.000Z",
} as const satisfies StoryTurnPlayed
