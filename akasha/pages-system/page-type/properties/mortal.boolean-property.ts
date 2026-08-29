import type { BooleanProperty } from "../../boolean-property/boolean-property.page-type.ts"

export type Mortal = boolean

export const mortal = {
  id: "01a04db0-5818-7000-9db8-d72ace0c1877",
  pageTypeSlug: "boolean-property",
  slug: "mortal",
  definition: "whether a page type's pages are expected to be deleted",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type is mortal only if it says so.",
    },
    {
      invariantKind: "departure",
      statement: "A non-mortal page cannot have a relation to a mortal page.",
    },
  ],
} as const satisfies BooleanProperty
