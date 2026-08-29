import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { InvariantKind } from "./invariant-kind.page-property-type.ts"
import type { Statement } from "./statement.page-property-type.ts"

export type Invariant<K extends InvariantKind> = {
  invariantKind: K
  statement: Statement
}

export const invariant = {
  id: "01a049cc-1727-7b7f-8b45-e3cde272a380",
  pageTypeSlug: "page-property-type",
  slug: "invariant",
  definition: "one thing that must be true of a page, and which sort it is",
  extendsSlug: null,
  kind: "record",
  design: [
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
} as const satisfies PagePropertyType
