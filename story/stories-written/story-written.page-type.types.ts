import type { Collection } from "../../collections/collection.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"

export type StoryWritten = Collection & {
  title: Title
  world?: World
  prose?: Prose
}
