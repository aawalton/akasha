import type {
  List,
  PagePropertyType,
} from "../../page-property-type/page-property-type.page-type.ts"
import type { Declaration } from "./declaration.page-property-type.ts"

export type Properties = List<Declaration>

export const properties = {
  id: "01a04df3-6848-7e77-ba2c-9399e3f6a356",
  pageTypeSlug: "page-property-type",
  slug: "properties",
  definition: "the properties a page type adds to what it extends",
  extendsSlug: null,
  kind: "list",
  entrySlug: "declaration",
  max: null,
  design: [
    {
      invariantKind: "departure",
      statement:
        "A page type declares only the properties it adds, and takes the rest from the type it extends.",
    },
  ],
} as const satisfies PagePropertyType
