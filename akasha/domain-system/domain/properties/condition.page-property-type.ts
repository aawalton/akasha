import type {
  List,
  PagePropertyType,
} from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Invariant } from "./invariant.page-property-type.ts"
import type { ConditionKind } from "./invariant-kind.page-property-type.ts"

export type Condition = List<Invariant<ConditionKind>>

export const condition = {
  id: "01a049c8-3ead-7eb7-8acd-99d8f7acb304",
  pageTypeSlug: "page-property-type",
  slug: "condition",
  definition: "a state that holds only while it is kept true",
  extendsSlug: "page-property-type/invariant",
  kind: "list",
  entrySlug: "invariant",
  max: null,
  design: [
    {
      invariantKind: "departure",
      statement: "A stopgap is paired with an intent to make it always true.",
    },
  ],
} as const satisfies PagePropertyType
