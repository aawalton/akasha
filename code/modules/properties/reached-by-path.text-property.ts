import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const reachedByPath = {
  id: "01a0a1f2-dd68-73f4-8512-622bc33a65ca",
  type: "text-property",
  slug: "reached-by-path",
  propertySlug: "reached-by-path",
  definition: "the name a module exports that something reaches by spelling this file's path",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A module names here what reaches it by path, rather than a check keeping a list.",
    },
    {
      invariantKind: "departure",
      statement: "A name declared here is an export of the module declaring it.",
    },
    {
      invariantKind: "departure",
      statement: "A module saying nothing here is reached by nothing but imports.",
    },
    {
      invariantKind: "departure",
      statement: "A reach is what a module declares rather than what a walk of the tree turns up.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
