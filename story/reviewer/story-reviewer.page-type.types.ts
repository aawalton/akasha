import type { Page } from "akasha/page/page.page-type.types.ts"
import type { StoryReviewerInstructions } from "akasha/story/reviewer/properties/story-reviewer-instructions.file-property.types.ts"
import type { StoryReviewerName } from "akasha/story/reviewer/properties/story-reviewer-name.text-property.types.ts"

export type StoryReviewer = Page & {
  name: StoryReviewerName
  instructions: StoryReviewerInstructions
}
