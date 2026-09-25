import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { CollectionAuthor } from "akasha/alan/collection/properties/collection-author.text-property.types.ts"
import type { GbwwEditionMarker } from "akasha/alan/collection/reading/gbww-reading/properties/gbww-edition-marker.select-property.types.ts"
import type { GbwwPlanKey } from "akasha/alan/collection/reading/gbww-reading/properties/gbww-plan-key.text-property.types.ts"
import type { GbwwPlanYear } from "akasha/alan/collection/reading/gbww-reading/properties/gbww-plan-year.number-property.types.ts"
import type { GbwwReadingNumber } from "akasha/alan/collection/reading/gbww-reading/properties/gbww-reading-number.number-property.types.ts"
import type { GbwwSection } from "akasha/alan/collection/reading/gbww-reading/properties/gbww-section.text-property.types.ts"
import type { GbwwStory } from "akasha/alan/collection/reading/gbww-reading/properties/gbww-story.relation-property.types.ts"
import type { GbwwWork } from "akasha/alan/collection/reading/gbww-reading/properties/gbww-work.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

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
