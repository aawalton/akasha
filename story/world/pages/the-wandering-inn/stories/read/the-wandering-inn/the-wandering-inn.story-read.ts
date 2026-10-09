import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theWanderingInn = {
  id: "01a0657d-ada7-783d-a3df-0d4d06ca98ab",
  type: "page-type/story-read",
  slug: "the-wandering-inn",
  title: "The Wandering Inn",
  world: "world/the-wandering-inn",
  externalIdentity: [
    {
      source: "the-wandering-inn",
      externalLink: "https://wanderinginn.com/",
    },
  ],
  grade: "S",
  following: true,
  tags: ["litrpg", "fantasy", "slice-of-life"],
  unit: "unit/words",
  prose: "txt",
  picturesOnBeats: true,
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-10-09T01:01:06.780Z",
} as const satisfies StoryRead
