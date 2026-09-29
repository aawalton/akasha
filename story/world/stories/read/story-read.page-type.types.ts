import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { Parts } from "akasha/domain/properties/parts.multi-relation-property.types.ts"
import type { Story } from "akasha/story/story.page-type.types.ts"
import type { ExternalTags } from "akasha/story/world/stories/read/properties/external-tags.text-property.types.ts"
import type { PublicationStatus } from "akasha/story/world/stories/read/properties/publication-status.select-property.types.ts"

export type StoryRead = Story &
  CollectionExternal & {
    externalTags?: ExternalTags
    publicationStatus?: PublicationStatus
    parts?: Parts
  }
