import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { Lenient } from "./lenient.boolean-property.types.ts"
import type { RunArgument } from "./run-argument.text-property.types.ts"
import type { RunBefore } from "./run-before.text-property.types.ts"
import type { RunCode } from "./run-code.relation-property.types.ts"
import type { RunPage } from "./run-page.relation-property.types.ts"

export type Start = {
  code: RunCode
  before?: RunBefore
  pages?: RunPage
  arguments?: RunArgument
  lenient?: Lenient
}

export const starts = {
  id: "01a08e09-01aa-7087-947d-3ba243cffb36",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "starts",
  propertySlug: "starts",
  definition: "a command a service starts, naming the page it runs rather than spelling a path",
  properties: [
    { pageProperty: "relation-property/run-code", required: true, many: false },
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
      invariantKind: "departure",
      statement: "A command running a program outside this repository is stated as a run instead.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
