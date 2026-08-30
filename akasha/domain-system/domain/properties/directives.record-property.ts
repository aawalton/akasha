import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { RecordProperty } from "../../../pages-system/record-property/record-property.page-type.ts"
import type { Act } from "./act.text-property.ts"
import type { Aids } from "./aids.text-property.ts"
import type { DirectiveKind } from "./directive-kind.relation-property.ts"
import type { Name } from "./name.text-property.ts"
import type { Warrant } from "./warrant.text-property.ts"

export type Directive = {
  directiveKind: DirectiveKind
  name: Name
  act: Act
  warrant: Warrant
  aids: Aids
}

export type Directives = List<Directive>

export const directives = {
  id: "01a04e1f-cbf6-7150-812b-844b9bf21ed2",
  pageTypeSlug: "record-property",
  slug: "directives",
  propertySlug: "directives",
  definition: "what a domain tells whoever reads it to do, each with the sort it is",
  properties: [
    { pagePropertySlug: "directive-kind", required: true, many: false },
    { pagePropertySlug: "name", required: true, many: false },
    { pagePropertySlug: "act", required: true, many: false },
    { pagePropertySlug: "warrant", required: true, many: false },
    { pagePropertySlug: "aids", required: true, many: true, max: 5 },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list holds every directive.",
    },
    {
      invariantKind: "departure",
      statement:
        "A directive that needs more aids than it may hold is carrying design, which belongs in an invariant.",
    },
  ],
} as const satisfies RecordProperty
