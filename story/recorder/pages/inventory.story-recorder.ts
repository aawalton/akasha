import type { StoryRecorder } from "akasha/story/recorder/story-recorder.page-type.types.ts"

export const inventory = {
  id: "01a0f1ef-023f-7d04-bc51-bda6279048f2",
  type: "page-type/story-recorder",
  slug: "inventory",
  name: "Inventory",
  step: "step-status/mechanics",
  instructions: "md",
} as const satisfies StoryRecorder
