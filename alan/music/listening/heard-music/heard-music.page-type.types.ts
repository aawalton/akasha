import type { Person } from "akasha/agents/seats/properties/person.relation-property.types.ts"
import type { Tracks } from "akasha/alan/music/listening/heard-music/tracks/tracks.page-property-entry.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type HeardMusic = Page & {
  person: Person
  tracks: Tracks
}
