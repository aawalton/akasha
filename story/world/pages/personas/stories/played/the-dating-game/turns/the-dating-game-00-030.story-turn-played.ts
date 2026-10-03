import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00030 = {
  id: "01a0e55f-01e4-7306-8930-a4b3cc04b57c",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-030",
  cover: "image/image-5503c8d47b3415f8",
  coverAfter: "When you finish, she is quiet for a long moment, the lantern",
  ownLength: 243,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 30,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "“I’m not sure how to describe it. I only recently realized it’s not how everyone else experiences things. I have total aphantasia, which means no experiential memory or imagination, so maybe a clearer way to put it is I only experience the present and the past and future don’t really exist at all except as concepts. I don’t have a very strong sense of identity, since my experience is limited to about a three second sensory buffer. I think of it like each three second window is a different person, and that three seconds is all they get. In that perspective, something like fifty million Alans have already died. What is there to fear about one more? I fear pain much more than death, and I pity and mourn the versions of myself who only experience pain in their three second window.”",
  beats: "jsonl",
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/picture", "story-recorder/memory", "story-recorder/mechanics"],
  endsAt: "2026-09-26T19:29:00.000Z",
} as const satisfies StoryTurnPlayed
