import type { Slug } from "akasha/pages/properties/slug.text-property.types.ts"
import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Start = {
  module: Slug
  before?: List<string>
  pages?: List<Slug>
  arguments?: List<string>
  lenient?: boolean
}

export type Starts = List<Start>

export const starts = {
  id: "01a08e09-01aa-7087-947d-3ba243cffb36",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "starts",
  propertySlug: "starts",
  definition: "a command a service starts, naming its module rather than spelling a path",
  properties: [
    { pageProperty: "relation-property/run-module", required: true, many: false },
    { pageProperty: "text-property/run-before", required: false, many: true, maxCount: null },
    { pageProperty: "relation-property/run-page", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/run-argument", required: false, many: true, maxCount: null },
    { pageProperty: "boolean-property/lenient", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One record has every part of one command.",
    },
    {
      invariantKind: "departure",
      statement: "Every page a command hands over comes before every word that command spells.",
    },
    {
      invariantKind: "departure",
      statement: "A command line is composed from this record rather than written by hand.",
    },
    {
      invariantKind: "gap",
      statement: "A command running a program outside this repository is stated here.",
    },
    {
      invariantKind: "gap",
      statement: "A command running a shell script's own file is stated here.",
    },
  ],
} as const satisfies RecordProperty
