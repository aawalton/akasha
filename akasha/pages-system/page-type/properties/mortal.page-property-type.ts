import type { PagePropertyType } from "../../page-property-type/page-property-type.page-type.ts"

export type Mortal = boolean

export const mortal = {
  id: "01a04db0-5818-7000-9db8-d72ace0c1877",
  pageTypeSlug: "page-property-type",
  slug: "mortal",
  definition: "whether a page type's pages are expected to be deleted",
  extendsSlug: null,
  kind: "boolean",
  design: [
    {
      invariantKind: "departure",
      statement: "A page type is mortal only if it says so.",
    },
    {
      invariantKind: "departure",
      statement: "A non-mortal page cannot have a relation to a mortal page.",
    },
  ],
} as const satisfies PagePropertyType
