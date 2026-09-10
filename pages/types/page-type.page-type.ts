import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { PluralSlug } from "../../domains/properties/plural-slug.text-property.ts"
import type { AllowsTmpPaths } from "./properties/allows-tmp-paths.boolean-property.ts"
import type { DetailConfig } from "./properties/detail-config.record-property.ts"
import type { ExtendsType } from "./properties/extends-type.relation-property.ts"
import type { LoadedBy } from "./properties/loaded-by.relation-property.ts"
import type { MediaConfig } from "./properties/media-config.record-property.ts"
import type { Mortal } from "./properties/mortal.boolean-property.ts"
import type { NextSeq } from "./properties/next-seq.number-property.ts"
import type { Owner } from "./properties/owner.relation-property.ts"
import type { Properties } from "./properties/properties.record-property.ts"
import type { RunsTabooCheck } from "./properties/runs-taboo-check.boolean-property.ts"
import type { Sequence } from "./properties/sequence.record-property.ts"
import type { TypeGenerator } from "./properties/type-generator.file-property.ts"
import type { Types } from "./properties/types.file-property.ts"
import type { Worked } from "./properties/worked.file-property.ts"

export type PageType = Domain & {
  extends: ExtendsType
  properties?: Properties
  mortal?: Mortal
  pluralSlug: PluralSlug
  loadedBy?: LoadedBy
  detailConfig?: DetailConfig
  mediaConfig?: MediaConfig
  sequence?: Sequence
  nextSeq?: NextSeq
  owner?: Owner
  runsTabooCheck?: RunsTabooCheck
  allowsTmpPaths?: AllowsTmpPaths
  worked?: Worked
  typeGenerator?: TypeGenerator
  types?: Types
}

export const pageType = {
  id: "01a049ae-fe2c-7343-8ab6-f94d8927164a",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "page-type",
  definition: "the specification for a kind of page",
  pluralSlug: "page-types",
  parts: [
    "module/page-type-descent",
    "module/page-type-folder",
    "module/page-type-gathering",
    "module/declared-properties",
    "boolean-property/allows-tmp-paths",
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
    "file-property/type-generator",
    "file-property/types",
    "file-property/worked",
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
    "relation-property/extends-type",
    "relation-property/loaded-by",
    "relation-property/owner",
    "relation-property/page-property",
    "text-property/body-property-id",
    "text-property/child-relation",
    "text-property/default-value",
    "text-property/detail-display",
    "text-property/fixed-value",
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
  extends: ["page-type/domain"],
  properties: [
    {
      pageProperty: "relation-property/extends-type",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "record-property/properties", required: false, many: true, maxCount: null },
    { pageProperty: "boolean-property/mortal", required: false, many: false },
    { pageProperty: "text-property/plural-slug", required: true, many: false },
    { pageProperty: "relation-property/loaded-by", required: false, many: false },
    { pageProperty: "record-property/detail-config", required: false, many: false },
    { pageProperty: "record-property/media-config", required: false, many: false },
    { pageProperty: "record-property/sequence", required: false, many: false },
    { pageProperty: "boolean-property/runs-taboo-check", required: false, many: false },
    { pageProperty: "boolean-property/allows-tmp-paths", required: false, many: false },
    { pageProperty: "number-property/next-seq", required: false, many: false },
    { pageProperty: "relation-property/owner", required: false, many: false },
    { pageProperty: "file-property/worked", required: false, many: false },
    { pageProperty: "file-property/type-generator", required: false, many: false },
    { pageProperty: "file-property/types", required: false, many: false },
  ],
  typeGenerator: "ts",
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
    {
      invariantKind: "departure",
      statement: "A page type says here whether the paths its pages spell are a container's.",
    },
    {
      invariantKind: "absence",
      statement: "A page type says nothing about where the pages of that page type sit.",
    },
  ],
} as const satisfies PageType
