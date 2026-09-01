import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { InvariantKind } from "./invariant-kind.relation-property.ts"
import type { InvariantStatement } from "./invariant-statement.text-property.ts"

export type Invariant = {
  invariantKind: InvariantKind
  statement: InvariantStatement
}

export type Invariants = List<Invariant>

export const invariants = {
  id: "01a04e14-2276-7559-823a-c7ac8abf852e",
  pageTypeSlug: "record-property",
  slug: "invariants",
  propertySlug: "invariants",
  definition: "what must be true of a page, each with the sort it is",
  properties: [
    { pagePropertySlug: "invariant-kind", required: true, many: false },
    { pagePropertySlug: "invariant-statement", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list holds every invariant.",
    },
    {
      invariantKind: "departure",
      statement: "An entry that is no invariant kind is not an invariant.",
    },
    {
      invariantKind: "departure",
      statement: "An invariant states what is true rather than why.",
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
