import type { Groups } from "akasha/alan/harness/readout/properties/groups.multi-relation-property.types.ts"
import type { Place } from "akasha/alan/harness/readout/properties/place.number-property.types.ts"
import type { App } from "akasha/alan/harness/readout/widget/properties/app.relation-property.types.ts"
import type { Caption } from "akasha/alan/harness/readout/widget/properties/caption.text-property.types.ts"
import type { Component } from "akasha/alan/harness/readout/widget/properties/component.relation-property.types.ts"
import type { Families } from "akasha/alan/harness/readout/widget/properties/families.text-property.types.ts"
import type { Feed } from "akasha/alan/harness/readout/widget/properties/feed.url-property.types.ts"
import type { GalleryDescription } from "akasha/alan/harness/readout/widget/properties/gallery-description.text-property.types.ts"
import type { GalleryName } from "akasha/alan/harness/readout/widget/properties/gallery-name.text-property.types.ts"
import type { Kind } from "akasha/alan/harness/readout/widget/properties/kind.text-property.types.ts"
import type { LastTappedAt } from "akasha/alan/harness/readout/widget/properties/last-tapped-at.instant-property.types.ts"
import type { Opens } from "akasha/alan/harness/readout/widget/properties/opens.text-property.types.ts"
import type { Taps } from "akasha/alan/harness/readout/widget/properties/taps.number-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type ReadoutWidget = Domain & {
  app: App
  component: Component
  kind: Kind
  families: Families
  feed?: Feed
  caption?: Caption
  galleryName: GalleryName
  galleryDescription: GalleryDescription
  opens?: Opens
  groups?: Groups
  place: Place
  taps?: Taps
  lastTappedAt?: LastTappedAt
}
