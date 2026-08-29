import type {
  List,
  PagePropertyType,
} from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Invariant } from "./invariant.page-property-type.ts"

export type Invariants = List<Invariant>

export const invariants = {
  id: "01a04e14-2276-7559-823a-c7ac8abf852e",
  pageTypeSlug: "page-property-type",
  slug: "invariants",
  definition: "what must be true of a page, each with the sort it is",
  extendsSlug: null,
  kind: "list",
  entrySlug: "invariant",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list holds every invariant, because each entry states the kind it is.",
    },
  ],
} as const satisfies PagePropertyType
