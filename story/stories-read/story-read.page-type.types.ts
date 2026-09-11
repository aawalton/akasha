import type { CollectionExternal } from "akasha/alan/collections/externals/collection-external.page-type.types.ts"
import type { Source } from "akasha/alan/collections/externals/properties/source.select-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { Prose } from "akasha/story/stories-played/properties/prose.file-property.types.ts"
import type { World } from "akasha/story/stories-played/properties/world.relation-property.types.ts"
import type { ExternalTags } from "akasha/story/stories-read/properties/external-tags.text-property.types.ts"
import type { PublicationStatus } from "akasha/story/stories-read/properties/publication-status.select-property.types.ts"

export type StoryRead = CollectionExternal & {
  title: Title
  world?: World
  source: Source
  externalTags?: ExternalTags
  publicationStatus?: PublicationStatus
  prose?: Prose
}
