import type { Page } from "../../../../pages/page.page-type.types.ts"
import type { Person } from "../../../../seat-system/seats/properties/person.relation-property.types.ts"
import type { Tracks } from "./tracks/tracks.page-property-entry.types.ts"

export type HeardMusic = Page & {
  person: Person
  tracks: Tracks
}
