import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type DesignKind = "departure" | "absence" | "constraint"
export type IntentKind = "gap"
export type ConditionKind = "stopgap" | "upkeep"
export type InvariantKind = DesignKind | IntentKind | ConditionKind

export const invariantKind = {
  id: "01a04d66-767b-740d-a958-1f84e5858ad0",
  pageTypeSlug: "page-property-type",
  slug: "invariant-kind",
  definition: "which sort of invariant one entry is",
  extendsSlug: null,
  kind: "text",
  max: 10,
  nameFormatSlug: null,
  design: [
    {
      invariantKind: "departure",
      statement: "Design, intent and condition each take their own kinds, and share none.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The plain word `kind` names which kind of value a property holds, never which kind of invariant.",
    },
  ],
} as const satisfies PagePropertyType
