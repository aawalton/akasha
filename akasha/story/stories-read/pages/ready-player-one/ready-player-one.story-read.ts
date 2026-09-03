import type { StoryRead } from "../../story-read.page-type.ts"

export const readyPlayerOne = {
  id: "01a0657d-ada7-75e3-b5b5-19088b5dc940",
  pageTypeSlug: "story-read",
  slug: "ready-player-one",
  title: "Ready Player One",
  worldSlug: "ready-player-one",
  source: "kindle",
  rank: "C",
  tags: ["VRMMO"],
  unitSlug: "words",
} as const satisfies StoryRead
