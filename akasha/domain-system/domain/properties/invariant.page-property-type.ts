import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { InvariantKind } from "./invariant-kind.page-property-type.ts"
import type { Statement } from "./statement.page-property-type.ts"

export type Invariant = {
  invariantKind: InvariantKind
  statement: Statement
}

export const invariant = {
  id: "01a049cc-1727-7b7f-8b45-e3cde272a380",
  pageTypeSlug: "page-property-type",
  slug: "invariant",
  definition: "one thing that must be true of a page, and which sort it is",
  extendsSlug: null,
  kind: "record",
  invariants: [
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
  rule: [
    {
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
} as const satisfies PagePropertyType
