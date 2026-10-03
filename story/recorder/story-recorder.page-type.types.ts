import type { Page } from "akasha/page/page.page-type.types.ts"
import type { StoryRecorderInstructions } from "akasha/story/recorder/properties/story-recorder-instructions.file-property.types.ts"
import type { StoryRecorderName } from "akasha/story/recorder/properties/story-recorder-name.text-property.types.ts"
import type { StoryRecorderStep } from "akasha/story/recorder/properties/story-recorder-step.relation-property.types.ts"

export type StoryRecorder = Page & {
  name: StoryRecorderName
  step?: StoryRecorderStep
  instructions: StoryRecorderInstructions
}
