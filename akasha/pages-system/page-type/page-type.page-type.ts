import type { Domain } from "@akasha/domain-system/domain"
import type { PluralSlug } from "../../domain-system/domains/properties/plural-slug.text-property.ts"
import type { ExtendsSlug } from "./properties/extends-slug.relation-property.ts"
import type { LoadedBySlug } from "./properties/loaded-by-slug.relation-property.ts"
import type { MediaConfig } from "./properties/media-config.record-property.ts"
import type { Mortal } from "./properties/mortal.boolean-property.ts"
import type { Properties } from "./properties/properties.record-property.ts"
import type { Sequence } from "./properties/sequence.record-property.ts"

export type PageType = Domain & {
  extendsSlug: ExtendsSlug | null
  properties?: Properties
  mortal?: Mortal
  pluralSlug: PluralSlug
  loadedBySlug?: LoadedBySlug
  mediaConfig?: MediaConfig
  sequence?: Sequence
}

export const pageType = {
  id: "01a049ae-fe2c-7343-8ab6-f94d8927164a",
  pageTypeSlug: "page-type",
  slug: "page-type",
  definition: "the specification for a kind of page",
  pluralSlug: "page-types",
  partSlugs: [
    "module/page-type-descent",
    "module/page-type-properties",
    "boolean-property/many",
    "boolean-property/mortal",
    "boolean-property/required",
    "boolean-property/secret",
    "boolean-property/uncommitted",
    "record-property/audio-media",
    "record-property/image-media",
    "record-property/media-config",
    "record-property/properties",
    "record-property/sequence",
    "relation-property/extends-slug",
    "relation-property/loaded-by-slug",
    "relation-property/page-property-slug",
    "text-property/default-value",
    "text-property/media-renderer",
    "text-property/media-source-property-id",
    "text-property/media-variant-axis",
    "text-property/sequence-direction",
    "text-property/sequence-group-by",
    "text-property/sequence-order-by",
  ],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "extends-slug", required: true, many: false },
    { pagePropertySlug: "properties", required: false, many: true, max: null },
    { pagePropertySlug: "mortal", required: false, many: false },
    { pagePropertySlug: "plural-slug", required: true, many: false },
    { pagePropertySlug: "loaded-by-slug", required: false, many: false },
    { pagePropertySlug: "media-config", required: false, many: false },
    { pagePropertySlug: "sequence", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "upkeep",
      statement: "The slug of a page type is singular.",
    },
    {
      invariantKind: "departure",
      statement: "A page type says here whether its pages are rendered as audio or as an image.",
    },
    {
      invariantKind: "departure",
      statement: "A page type says here how its pages are grouped and ordered into a run.",
    },
  ],
} as const satisfies PageType
