import type { ExternalId } from "akasha/alan/collection/external/properties/external-id.text-property.types.ts"
import type { Story } from "akasha/story/story.page-type.types.ts"
import type { ChapterBreak } from "akasha/story/world/stories/played/properties/chapter-break.text-property.types.ts"
import type { CoordinatorAgent } from "akasha/story/world/stories/played/properties/coordinator-agent.text-property.types.ts"
import type { Panels } from "akasha/story/world/stories/played/properties/panels.multi-relation-property.types.ts"

export type StoryPlayed = Story & {
  panels?: Panels
  externalId?: ExternalId
  coordinatorAgent?: CoordinatorAgent
  chapterBreak?: ChapterBreak
}
