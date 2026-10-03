import type { Edits } from "akasha/agent/properties/edits.file-property.types.ts"
import type { Chapter } from "akasha/story/chapter/chapter.page-type.types.ts"
import type { SceneImages } from "akasha/story/world/stories/written/chapters/properties/scene-images.multi-relation-property.types.ts"

export type StoryChapterWritten = Chapter & {
  edits?: Edits
  scenes?: SceneImages
}
