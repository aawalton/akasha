import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type InvariantKind = "departure" | "absence" | "constraint" | "gap" | "stopgap" | "upkeep"

export const invariantKind = {
  id: "01a04d66-767b-740d-a958-1f84e5858ad0",
  pageTypeSlug: "page-property-type",
  slug: "invariant-kind",
  definition: "which sort of invariant one entry is",
  extendsSlug: null,
  kind: "relation",
  targetPageTypeSlug: "page-type/invariant-kind",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "The plain word `kind` names which kind of value a property holds, never which kind of invariant.",
    },
  ],
} as const satisfies PagePropertyType
