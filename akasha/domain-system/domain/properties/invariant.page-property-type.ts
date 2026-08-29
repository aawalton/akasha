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
  definition: "one thing that must be true of a page, and the way a reader gets it wrong",
  extendsSlug: null,
  kind: "record",
} as const satisfies PagePropertyType
