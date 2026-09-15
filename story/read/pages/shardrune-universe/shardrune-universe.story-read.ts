import type { StoryRead } from "akasha/story/read/story-read.page-type.types.ts"

export const shardruneUniverse = {
  id: "01a0657d-ada7-7a6b-874b-5e833b4b2315",
  type: "story-read",
  slug: "shardrune-universe",
  title: "Shardrune Universe",
  world: "world/shardrune-universe",
  rank: "B",
  following: true,
  unit: "unit/words",
} as const satisfies StoryRead
