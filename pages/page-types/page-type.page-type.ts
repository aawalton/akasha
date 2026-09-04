import type { Domain } from "@akasha/domain-system/domain"
import type { PluralSlug } from "../../domains/properties/plural-slug.text-property.ts"
import type { DetailConfig } from "./properties/detail-config.record-property.ts"
import type { ExtendsSlug } from "./properties/extends-slug.relation-property.ts"
import type { LoadedBySlug } from "./properties/loaded-by-slug.relation-property.ts"
import type { MediaConfig } from "./properties/media-config.record-property.ts"
import type { Mortal } from "./properties/mortal.boolean-property.ts"
import type { NextSeq } from "./properties/next-seq.number-property.ts"
import type { OwnerSlug } from "./properties/owner-slug.relation-property.ts"
import type { Properties } from "./properties/properties.record-property.ts"
import type { RunsTabooCheck } from "./properties/runs-taboo-check.boolean-property.ts"
import type { Sequence } from "./properties/sequence.record-property.ts"

export type PageType = Domain & {
  extendsSlug: readonly ExtendsSlug[]
  properties?: Properties
  mortal?: Mortal
  pluralSlug: PluralSlug
  loadedBySlug?: LoadedBySlug
  detailConfig?: DetailConfig
  mediaConfig?: MediaConfig
  sequence?: Sequence
  nextSeq?: NextSeq
  ownerSlug?: OwnerSlug
  runsTabooCheck?: RunsTabooCheck
}

export const pageType = {
  id: "01a049ae-fe2c-7343-8ab6-f94d8927164a",
  pageTypeSlug: "page-type",
  slug: "page-type",
  definition: "the specification for a kind of page",
  pluralSlug: "page-types",
  partSlugs: [
    "module/page-type-descent",
    "module/declared-properties",
    "boolean-property/frame-edge-to-edge",
    "boolean-property/frame-focus-mode",
    "boolean-property/full-bleed",
    "boolean-property/header-show-cover",
    "boolean-property/many",
    "boolean-property/mark-read-on-end",
    "boolean-property/mortal",
    "boolean-property/required",
    "boolean-property/runs-taboo-check",
    "boolean-property/secret",
    "boolean-property/show-reading-progress",
    "boolean-property/uncommitted",
    "number-property/next-seq",
    "page-type/page-property",
    "record-property/audio-media",
    "record-property/child-collection",
    "record-property/collection-header",
    "record-property/detail-config",
    "record-property/detail-frame",
    "record-property/frame-auto-scroll",
    "record-property/image-media",
    "record-property/media-config",
    "record-property/properties",
    "record-property/sequence",
    "relation-property/child-type",
    "relation-property/extends-slug",
    "relation-property/loaded-by-slug",
    "relation-property/owner-slug",
    "relation-property/page-property-slug",
    "text-property/body-property-id",
    "text-property/child-relation",
    "text-property/default-value",
    "text-property/detail-display",
    "text-property/header-fields",
    "text-property/length-property-id",
    "text-property/load-scroll",
    "text-property/media-renderer",
    "text-property/media-source-property-id",
    "text-property/media-variant-axis",
    "text-property/progress-property-id",
    "text-property/sequence-direction",
    "text-property/sequence-group-by",
    "text-property/sequence-order-by",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "extends-slug", required: true, many: true, max: null },
    { pagePropertySlug: "properties", required: false, many: true, max: null },
    { pagePropertySlug: "mortal", required: false, many: false },
    { pagePropertySlug: "plural-slug", required: true, many: false },
    { pagePropertySlug: "loaded-by-slug", required: false, many: false },
    { pagePropertySlug: "detail-config", required: false, many: false },
    { pagePropertySlug: "media-config", required: false, many: false },
    { pagePropertySlug: "sequence", required: false, many: false },
    { pagePropertySlug: "runs-taboo-check", required: false, many: false },
    { pagePropertySlug: "next-seq", required: false, many: false },
    { pagePropertySlug: "owner-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "upkeep",
      statement: "The slug of a page type is singular.",
    },
    {
      invariantKind: "departure",
      statement: "A page type says here how its page stands on a screen of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A page type says here whether its pages are rendered as audio or as an image.",
    },
    {
      invariantKind: "departure",
      statement: "A page type says here how its pages are grouped and ordered into a run.",
    },
    {
      invariantKind: "departure",
      statement: "A page type says here whether the taboo terms are judged over its pages.",
    },
  ],
} as const satisfies PageType
