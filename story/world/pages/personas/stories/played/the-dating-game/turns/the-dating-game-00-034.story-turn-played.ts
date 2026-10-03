import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00034 = {
  id: "01a0e57c-635e-769a-87a1-d128d8c653c4",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-034",
  cover: "image/image-35f2f2cb103fb21e",
  coverAfter: "Grace listens all the way through, walking slowly beside you, the lantern",
  ownLength: 175,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 34,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "“Well, my father died young, 57. He was divorced by the end. I’m the oldest of his kids and was the only one of fully grown at the time, so a lot of the weight fell on me, which was hard. I think the finances and paperwork hurt me more than the loss. I…don’t seem to form emotional attachments the same way most people do. It’s hard to feel attached when I can’t remember feelings. I think about him now and then, but the past when he was here and the past when he was gone are equally incomprehensible to me.”",
  beats: "jsonl",
  issues: [
    '"You come to the cemetery\'s far gate, where the path meets the street" - Leave It Open',
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/picture", "story-recorder/memory"],
  endsAt: "2026-09-26T19:36:00.000Z",
} as const satisfies StoryTurnPlayed
