import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { RecordProperty } from "../../../pages-system/page-property/record-property.page-type.ts"
import type { Act } from "./act.text-property.ts"
import type { Aid } from "./aid.text-property.ts"
import type { DirectiveKind } from "./directive-kind.relation-property.ts"
import type { Name } from "./name.text-property.ts"
import type { Warrant } from "./warrant.text-property.ts"

export type Directive = {
  directiveKind: DirectiveKind
  name: Name
  act: Act
  warrant: Warrant
  aids: List<Aid>
}

export type Directives = List<Directive>

export const directives = {
  id: "01a04e1f-cbf6-7150-812b-844b9bf21ed2",
  pageTypeSlug: "record-property",
  slug: "directives",
  definition: "what a domain tells whoever reads it to do, each with the sort it is",
  properties: [
    { propertySlug: "directive-kind", required: true, many: false },
    { propertySlug: "name", required: true, many: false },
    { propertySlug: "act", required: true, many: false },
    { propertySlug: "warrant", required: true, many: false },
    { propertySlug: "aid", required: true, many: true, max: 2 },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list holds every directive, because each entry states the kind it is.",
    },
  ],
} as const satisfies RecordProperty
