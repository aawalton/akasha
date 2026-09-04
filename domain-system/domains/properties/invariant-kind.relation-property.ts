import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type InvariantKind = "departure" | "absence" | "constraint" | "gap" | "stopgap" | "upkeep"

export const invariantKind = {
  id: "01a04d66-767b-740d-a958-1f84e5858ad0",
  pageTypeSlug: "relation-property",
  slug: "invariant-kind",
  propertySlug: "invariant-kind",
  definition: "which sort of invariant one entry is",
  targetPageTypeSlug: "page-type/invariant-kind",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "The plain word `kind` names the kind of value a property holds rather than the kind of invariant.",
    },
  ],
} as const satisfies RelationProperty
