import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { Chapter } from "akasha/story/chapter/chapter.page-type.types.ts"
import type { MarkedReadAt } from "akasha/story/world/stories/read/chapters/properties/marked-read-at.instant-property.types.ts"
import type { RemovedAt } from "akasha/story/world/stories/read/chapters/properties/removed-at.instant-property.types.ts"

export type StoryChapterRead = Chapter &
  CollectionExternal & {
    removedAt?: RemovedAt
    markedReadAt?: MarkedReadAt
  }
