import type { Act } from "akasha/domains/properties/act.standard-agent-english-property.types.ts"
import type { Aids } from "akasha/domains/properties/aids.standard-agent-english-property.types.ts"
import type { DirectiveKind } from "akasha/domains/properties/directive-kind.relation-property.types.ts"
import type { Name } from "akasha/domains/properties/name.text-property.types.ts"
import type { Warrant } from "akasha/domains/properties/warrant.standard-agent-english-property.types.ts"
import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export type Directive = {
  directiveKind: DirectiveKind
  name: Name
  act: Act
  warrant: Warrant
  aids: Aids
}

export const directives = {
  id: "01a04e1f-cbf6-7150-812b-844b9bf21ed2",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "directives",
  propertySlug: "directives",
  definition: "what a domain tells whoever reads it to do, each with the sort it is",
  properties: [
    { pageProperty: "relation-property/directive-kind", required: true, many: false },
    { pageProperty: "text-property/name", required: true, many: false },
    { pageProperty: "standard-agent-english-property/act", required: true, many: false },
    { pageProperty: "standard-agent-english-property/warrant", required: true, many: false },
    {
      pageProperty: "standard-agent-english-property/aids",
      required: true,
      many: true,
      maxCount: 10,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list has every directive.",
    },
    {
      invariantKind: "departure",
      statement:
        "A directive needing more aids than that directive may hold has design belonging in an invariant.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
