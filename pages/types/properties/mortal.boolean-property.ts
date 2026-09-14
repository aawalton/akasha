import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const mortal = {
  id: "01a04db0-5818-7000-9db8-d72ace0c1877",
  type: "boolean-property",
  slug: "mortal",
  propertySlug: "mortal",
  definition: "whether a page type's pages are expected to be deleted",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type is mortal only if the page type says so.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A non-mortal page cannot have a relation to a mortal page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A mortal page naming a page that is not there is not refused for naming that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name for a mortal page type is not refused for reaching no page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change is not refused for a fault a mortal page already had.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change is refused for a fault that change puts into a mortal page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Either exemption applies on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Neither exemption waits on the other exemption.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
