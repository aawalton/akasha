import type { StoryRead } from "akasha/story/stories-read/story-read.page-type.types.ts"

export const aThousandLi = {
  id: "01a0657d-ada7-7bfe-a1c5-a1e5adc2ec09",
  type: "story-read",
  slug: "a-thousand-li",
  title: "A Thousand Li",
  world: "a-thousand-li",
  source: "kindle",
  rank: "B",
  tags: ["Cultivation"],
  unit: "words",
} as const satisfies StoryRead
