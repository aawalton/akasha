import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const indexTracked = {
  id: "01a09b79-526b-785f-9360-742045f67544",
  type: "page-type/boolean-property",
  slug: "index-tracked",
  propertySlug: "tracked",
  definition: "whether git holds the answers an index files",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index saying nothing here is held by git nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index git holds says true here rather than being named elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change carries the answers such an index files among its own file changes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether git holds an index and whether `.gitignore` names it are one fact.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing refuses an index saying true here while `.gitignore` names that index.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
