import type { Page } from "../../../../pages/page.page-type.ts"
import type { Person } from "../../../../seat-system/seats/properties/person.relation-property.ts"
import type { Tracks } from "./tracks/tracks.page-property-entry.ts"

export type HeardMusic = Page & {
  person: Person
  tracks: Tracks
}
