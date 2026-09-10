import type { Collection } from "../../../../collections/collection.page-type.types.ts"
import type { CollectionAuthor } from "../../../../collections/properties/collection-author.text-property.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { GbwwEditionMarker } from "./properties/gbww-edition-marker.select-property.ts"
import type { GbwwPlanKey } from "./properties/gbww-plan-key.text-property.ts"
import type { GbwwPlanYear } from "./properties/gbww-plan-year.number-property.ts"
import type { GbwwReadingNumber } from "./properties/gbww-reading-number.number-property.ts"
import type { GbwwSection } from "./properties/gbww-section.text-property.ts"
import type { GbwwStory } from "./properties/gbww-story.relation-property.ts"
import type { GbwwWork } from "./properties/gbww-work.text-property.ts"

export type GbwwReading = Collection & {
  title: Title
  author: CollectionAuthor
  work: GbwwWork
  section: GbwwSection
  planKey: GbwwPlanKey
  planYear: GbwwPlanYear
  readingNumber: GbwwReadingNumber
  editionMarker: GbwwEditionMarker
  story?: GbwwStory
}
