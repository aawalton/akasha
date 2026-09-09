import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type NarrowComparison =
  | "is"
  | "in"
  | "not-in"
  | "has"
  | "contains"
  | "ends-with"
  | "empty"
  | "at-or-after"
  | "before"

export const narrowComparison = {
  id: "01a063ee-2a3b-7703-9869-e8ab3280d56f",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "narrow-comparison",
  propertySlug: "comparison",
  definition: "how one narrow weighs a page's value against what it names",
  maxLength: 20,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A comparison taking one value is given one value.",
    },
    {
      invariantKind: "departure",
      statement:
        "A comparison taking many values is given as many values as that comparison needs.",
    },
  ],
} as const satisfies TextProperty
