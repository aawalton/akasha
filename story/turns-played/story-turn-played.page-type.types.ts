import type { Collection } from "../../collections/collection.page-type.types.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"

export type StoryTurnPlayed = Collection & {
  prose: Prose
}
