import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { GroupSlugs } from "../readouts/properties/group-slugs.relation-property.ts"
import type { Place } from "../readouts/properties/place.number-property.ts"
import type { AppSlug } from "./properties/app-slug.relation-property.ts"
import type { Caption } from "./properties/caption.text-property.ts"
import type { ComponentSlug } from "./properties/component-slug.relation-property.ts"
import type { Families } from "./properties/families.text-property.ts"
import type { Feed } from "./properties/feed.url-property.ts"
import type { GalleryDescription } from "./properties/gallery-description.text-property.ts"
import type { GalleryName } from "./properties/gallery-name.text-property.ts"
import type { Kind } from "./properties/kind.text-property.ts"
import type { Opens } from "./properties/opens.text-property.ts"

export type ReadoutWidget = Domain & {
  appSlug: AppSlug
  componentSlug: ComponentSlug
  kind: Kind
  families: Families
  feed: Feed
  caption?: Caption
  galleryName: GalleryName
  galleryDescription: GalleryDescription
  opens?: Opens
  groupSlugs: GroupSlugs
  place: Place
}

export const readoutWidget = {
  id: "01a05480-1c86-7e95-b799-63b1c0152f62",
  pageTypeSlug: "page-type",
  slug: "readout-widget",
  definition: "one tile a person places on a phone",
  pluralSlug: "readout-widgets",
  partSlugs: [
    "readout-widget/alanwalton-attribute-stoplights",
    "readout-widget/alanwalton-categorize",
    "readout-widget/alanwalton-claude-usage",
    "readout-widget/alanwalton-inbox-stoplights",
    "readout-widget/alanwalton-safety-level",
    "readout-widget/alanwalton-surplus",
    "readout-widget/alanwalton-upkeep-stoplights",
    "readout-widget/smilingjenny-categorize",
    "readout-widget/smilingjenny-safety-level",
    "readout-widget/smilingjenny-surplus",
    "relation-property/app-slug",
    "relation-property/component-slug",
    "text-property/caption",
    "text-property/families",
    "url-property/feed",
    "text-property/gallery-description",
    "text-property/gallery-name",
    "text-property/kind",
    "text-property/opens",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "relation-property/app-slug", required: true, many: false },
    { pagePropertySlug: "component-slug", required: true, many: false },
    { pagePropertySlug: "kind", required: true, many: false },
    { pagePropertySlug: "families", required: true, many: true, max: null },
    { pagePropertySlug: "feed", required: true, many: false },
    { pagePropertySlug: "caption", required: false, many: false },
    { pagePropertySlug: "gallery-name", required: true, many: false },
    { pagePropertySlug: "gallery-description", required: true, many: false },
    { pagePropertySlug: "opens", required: false, many: false },
    { pagePropertySlug: "group-slugs", required: true, many: true, max: null },
    { pagePropertySlug: "place", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A widget names the component the widget is drawn in rather than the file's path.",
    },
    {
      invariantKind: "departure",
      statement: "A widget draws groups rather than readings.",
    },
    {
      invariantKind: "departure",
      statement: "A widget carries the words the gallery prints and nothing the tile draws.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The name a placed tile is bound to cannot change without the tile falling off the phone.",
    },
  ],
} as const satisfies PageType
