import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

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
        "The plain word `kind` names which kind of value a property holds rather than which kind of invariant.",
    },
  ],
} as const satisfies RelationProperty
