import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const stonehavenLeague = {
  id: "01a0657d-ada7-7021-b581-05de3229c000",
  type: "page-type/story-read",
  slug: "stonehaven-league",
  title: "Stonehaven League",
  world: "world/stonehaven-league",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07DYF99N1",
      externalLink: "https://www.amazon.com/dp/B07DYF99N1",
    },
  ],
  following: true,
  tags: ["VRMMO"],
  unit: "unit/words",
} as const satisfies StoryRead
