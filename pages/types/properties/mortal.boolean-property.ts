import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.ts"

export type Mortal = boolean

export const mortal = {
  id: "01a04db0-5818-7000-9db8-d72ace0c1877",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "mortal",
  propertySlug: "mortal",
  definition: "whether a page type's pages are expected to be deleted",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type is mortal only if the page type says so.",
    },
    {
      invariantKind: "departure",
      statement: "A non-mortal page cannot have a relation to a mortal page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mortal page naming a page that is not there is not refused for naming that page.",
    },
    {
      invariantKind: "departure",
      statement: "A name for a mortal page type is not refused for reaching no page.",
    },
    {
      invariantKind: "departure",
      statement: "Either exemption applies on its own.",
    },
    {
      invariantKind: "departure",
      statement: "Neither exemption waits on the other exemption.",
    },
  ],
} as const satisfies BooleanProperty
