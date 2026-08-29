import type {
  List,
  PagePropertyType,
} from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Statement } from "./statement.page-property-type.ts"

export type Condition = List<Statement>

export const condition = {
  id: "01a049c8-3ead-7eb7-8acd-99d8f7acb304",
  pageTypeSlug: "page-property-type",
  slug: "condition",
  definition: "a state that holds only while it is kept true",
  extendsSlug: null,
  kind: "list",
  entrySlug: "statement",
  max: null,
  design: [
    {
      invariantKind: "departure",
      statement:
        "Any condition that could be made always true is paired with an intent to make it so.",
    },
    {
      invariantKind: "departure",
      statement:
        "A condition nothing could make always true is a state we keep bringing the system back to.",
    },
  ],
} as const satisfies PagePropertyType
