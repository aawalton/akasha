import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"
import type { World } from "akasha/story/world/stories/played/properties/world.relation-property.types.ts"
import type { ExternalTags } from "akasha/story/world/stories/read/properties/external-tags.text-property.types.ts"
import type { PublicationStatus } from "akasha/story/world/stories/read/properties/publication-status.select-property.types.ts"

export type StoryRead = CollectionExternal & {
  title: Title
  world?: World
  externalTags?: ExternalTags
  publicationStatus?: PublicationStatus
  prose?: Prose
}
