import type { CollectionExternal } from "../../collections/externals/collection-external.page-type.types.ts"
import type { Source } from "../../collections/externals/properties/source.text-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"
import type { ExternalTags } from "./properties/external-tags.text-property.ts"
import type { PublicationStatus } from "./properties/publication-status.select-property.ts"

export type StoryRead = CollectionExternal & {
  title: Title
  world?: World
  source: Source
  externalTags?: ExternalTags
  publicationStatus?: PublicationStatus
  prose?: Prose
}
