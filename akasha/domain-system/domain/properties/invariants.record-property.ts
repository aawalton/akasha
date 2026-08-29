import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { RecordProperty } from "../../../pages-system/page-property/record-property.page-type.ts"
import type { InvariantKind } from "./invariant-kind.relation-property.ts"
import type { Statement } from "./statement.text-property.ts"

export type Invariant = {
  invariantKind: InvariantKind
  statement: Statement
}

export type Invariants = List<Invariant>

export const invariants = {
  id: "01a04e14-2276-7559-823a-c7ac8abf852e",
  pageTypeSlug: "record-property",
  slug: "invariants",
  definition: "what must be true of a page, each with the sort it is",
  properties: [
    { propertySlug: "invariant-kind", required: true, many: false },
    { propertySlug: "statement", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list holds every invariant, because each entry states the kind it is.",
    },
    {
      invariantKind: "departure",
      statement: "An entry that is none of the kinds is not an invariant.",
    },
    {
      invariantKind: "departure",
      statement: "An invariant states what is true, never why.",
    },
    {
      invariantKind: "departure",
      statement: "An invariant true of every page below a domain belongs to the domain.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Move When It Turns",
      act: "Move an invariant to the property that fits, or delete it, as soon as its truth changes.",
      warrant:
        "Nothing re-reads an invariant, so one filed where it no longer belongs misleads until tested.",
      aids: [
        "Check the whole claim, not just the case you met.",
        "Move it if still meant, delete it if not.",
      ],
    },
  ],
} as const satisfies RecordProperty
