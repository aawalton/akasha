import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const indexTracked = {
  id: "01a09b79-526b-785f-9360-742045f67544",
  type: "boolean-property",
  slug: "index-tracked",
  propertySlug: "tracked",
  definition: "whether git holds the answers an index files",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An index saying nothing here is held by git nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "An index git holds says true here rather than being named elsewhere.",
    },
    {
      invariantKind: "departure",
      statement: "A change carries the answers such an index files among its own file changes.",
    },
    {
      invariantKind: "departure",
      statement: "Whether git holds an index and whether `.gitignore` names it are one fact.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing refuses an index saying true here while `.gitignore` names that index.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
