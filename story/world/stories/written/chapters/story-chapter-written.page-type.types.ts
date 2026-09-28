import type { Edits } from "akasha/agent/properties/edits.file-property.types.ts"
import type { Chapter } from "akasha/story/chapter/chapter.page-type.types.ts"

export type StoryChapterWritten = Chapter & {
  edits?: Edits
}
