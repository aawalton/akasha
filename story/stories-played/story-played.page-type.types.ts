import type { Collection } from "../../collections/collection.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "./properties/prose.file-property.ts"
import type { World } from "./properties/world.relation-property.ts"

export type StoryPlayed = Collection & {
  title: Title
  world?: World
  prose?: Prose
}
