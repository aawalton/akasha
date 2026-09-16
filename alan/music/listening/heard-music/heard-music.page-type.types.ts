import type { Person } from "akasha/agent/seat/properties/person.relation-property.types.ts"
import type { Tracks } from "akasha/alan/music/listening/heard-music/properties/tracks/tracks.page-property-entry.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type HeardMusic = Page & {
  person: Person
  tracks: Tracks
}
