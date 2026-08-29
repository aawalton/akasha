import type {
  List,
  PagePropertyType,
} from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Statement } from "./statement.page-property-type.ts"

export type Invariant = List<Statement>

export const invariant = {
  id: "01a049cc-1727-7b7f-8b45-e3cde272a380",
  pageTypeSlug: "page-property-type",
  slug: "invariant",
  definition: "what must always be true of a page",
  extendsSlug: null,
  kind: "list",
  entrySlug: "statement",
  max: null,
} as const satisfies PagePropertyType
