import type { Domain } from "../../domains/domain.page-type.ts"
import type { Groups } from "../properties/groups.relation-property.ts"
import type { Place } from "../properties/place.number-property.ts"
import type { App } from "./properties/app.relation-property.ts"
import type { Caption } from "./properties/caption.text-property.ts"
import type { Component } from "./properties/component.relation-property.ts"
import type { Families } from "./properties/families.text-property.ts"
import type { Feed } from "./properties/feed.url-property.ts"
import type { GalleryDescription } from "./properties/gallery-description.text-property.ts"
import type { GalleryName } from "./properties/gallery-name.text-property.ts"
import type { Kind } from "./properties/kind.text-property.ts"
import type { LastTappedAt } from "./properties/last-tapped-at.instant-property.ts"
import type { Opens } from "./properties/opens.text-property.ts"
import type { Taps } from "./properties/taps.number-property.ts"

export type ReadoutWidget = Domain & {
  app: App
  component: Component
  kind: Kind
  families: Families
  feed: Feed
  caption?: Caption
  galleryName: GalleryName
  galleryDescription: GalleryDescription
  opens?: Opens
  groups: Groups
  place: Place
  taps?: Taps
  lastTappedAt?: LastTappedAt
}
