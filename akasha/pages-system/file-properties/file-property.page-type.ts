import type { PageProperty } from "../page-properties/page-property.page-type.ts"
import type { PageType } from "../page-types/page-type.page-type.ts"

export type FileProperty = PageProperty

export const fileProperty = {
  id: "01a04dff-9d7d-7487-9a08-2485e897542f",
  pageTypeSlug: "page-type",
  slug: "file-property",
  definition: "a page property held in its own file",
  pluralSlug: "file-properties",
  extendsSlug: "page-type/page-property",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file property's value is beside its page rather than in the page's own file.",
    },
    {
      invariantKind: "departure",
      statement: "A file property's value goes when its page goes.",
    },
    {
      invariantKind: "departure",
      statement: "A file property's value is loaded only where it is asked for by name.",
    },
    {
      invariantKind: "absence",
      statement: "No gate reading a page as prose reaches a file property's value.",
    },
  ],
} as const satisfies PageType
