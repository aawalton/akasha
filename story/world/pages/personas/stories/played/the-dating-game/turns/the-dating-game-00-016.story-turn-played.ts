import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00016 = {
  id: "01a0e373-bce1-7ab6-883a-6d1ac35b4cf5",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-016",
  cover: "image/image-84d0ecd6337688f4",
  coverAfter: "The trail has brought you out onto an overlook, and the canyon",
  ownLength: 301,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 16,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "\"Amazing! What a gift you have! We'll have to go back to my place for the books. I mean, we could read a digital version, but I think you'll enjoy my physical copies quite a bit more.\" I look out from the overlook we reached over the valley, with the fall colors scattered among the trees. \"This is a good place to turn around anyways, would you be comfortable coming back to my place? I even have a spare room we could turn into a recording studio, but you'll need to guide me through what we need. Money isn't an issue.\" I bounce up and down again on my toes, excited to get started. \"I've been dreaming of this for ages, I can't tell you how excited I am, and not just for the excuse to spend more time with you...\"",
  beats: "jsonl",
  issues: "txt",
  lore: ["place/the-dating-game-rock-canyon", "lore/the-dating-game-alan"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T10:12:00.000Z",
} as const satisfies StoryTurnPlayed
