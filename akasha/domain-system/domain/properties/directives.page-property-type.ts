import type {
  List,
  PagePropertyType,
} from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Directive } from "./directive.page-property-type.ts"

export type Directives = List<Directive>

export const directives = {
  id: "01a04e1f-cbf6-7150-812b-844b9bf21ed2",
  pageTypeSlug: "page-property-type",
  slug: "directives",
  definition: "what a domain tells whoever reads it to do, each with the sort it is",
  extendsSlug: null,
  kind: "list",
  entrySlug: "directive",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list holds every directive, because each entry states the kind it is.",
    },
  ],
} as const satisfies PagePropertyType
