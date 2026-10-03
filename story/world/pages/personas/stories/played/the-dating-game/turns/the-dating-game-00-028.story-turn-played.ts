import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00028 = {
  id: "01a0e54a-8931-72ce-8b6c-ed9767d33f2d",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-028",
  cover: "image/image-f206fe8bdac9104e",
  coverAfter: "The Provo City Cemetery opens ahead: old headstones in rows under tall",
  ownLength: 199,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 28,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: "“So, what’s with the lantern? Mind if I follow along for a bit?”",
  beats: "jsonl",
  issues: ['"So nobody has to walk in it without a light." - Nobody Acts'],
  lore: ["lore/the-dating-game-grace", "place/the-dating-game-provo-city-cemetery"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture", "story-recorder/memory", "story-recorder/mechanics"],
  endsAt: "2026-09-26T19:25:00.000Z",
} as const satisfies StoryTurnPlayed
