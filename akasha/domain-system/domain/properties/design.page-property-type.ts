import type {
  List,
  PagePropertyType,
} from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Invariant } from "./invariant.page-property-type.ts"
import type { DesignKind } from "./invariant-kind.page-property-type.ts"

export type Design = List<Invariant<DesignKind>>

export const design = {
  id: "01a049c8-3ead-7b7f-90cf-8f8bf8bb5436",
  pageTypeSlug: "page-property-type",
  slug: "design",
  definition: "an invariant that holds now",
  extendsSlug: "page-property-type/invariant",
  kind: "list",
  entrySlug: "invariant",
  max: null,
} as const satisfies PagePropertyType
