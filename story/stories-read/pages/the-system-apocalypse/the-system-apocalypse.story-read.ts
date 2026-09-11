import type { StoryRead } from "akasha/story/stories-read/story-read.page-type.types.ts"

export const theSystemApocalypse = {
  id: "01a0657d-ada7-7d4e-8b2f-140d5d8fe5da",
  type: "story-read",
  slug: "the-system-apocalypse",
  title: "The System Apocalypse",
  world: "the-system-apocalypse",
  source: "kindle",
  rank: "B",
  tags: ["System Apocalypse"],
  unit: "words",
} as const satisfies StoryRead
