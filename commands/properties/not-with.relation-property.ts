import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const notWith = {
  id: "01a09483-7144-7d5c-a857-085af955734b",
  type: "relation-property",
  slug: "not-with",
  propertySlug: "not-with",
  definition: "an argument one call never says beside this one",
  targetPageType: "page-type/argument",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call saying both arguments is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One entry states a pair, and the other entry needs no matching statement.",
    },
    {
      invariantKind: "departure",
      statement: "A pair one command may not say together is said together under another command.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which arguments may not be said together belongs to the command rather than to the argument.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
