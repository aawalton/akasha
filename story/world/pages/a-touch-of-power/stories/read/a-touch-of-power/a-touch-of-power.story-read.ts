import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const aTouchOfPower = {
  id: "01a0657d-ada7-7638-a0ca-21ba00fff17a",
  type: "page-type/story-read",
  slug: "a-touch-of-power",
  title: "A Touch of Power",
  world: "world/a-touch-of-power",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FFT68QFH",
      externalLink: "https://www.amazon.com/dp/B0FFT68QFH",
    },
  ],
  rank: "A",
  following: true,
  tags: ["System World"],
  unit: "unit/words",
} as const satisfies StoryRead
