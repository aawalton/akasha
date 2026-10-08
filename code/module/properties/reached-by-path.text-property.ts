import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const reachedByPath = {
  id: "01a0a1f2-dd68-73f4-8512-622bc33a65ca",
  type: "page-type/text-property",
  slug: "reached-by-path",
  propertySlug: "reached-by-path",
  definition: "the name a module exports that something reaches by spelling this file's path",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A module names here what reaches it by path, rather than a check keeping a list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name declared here is an export of the module declaring it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module saying nothing here is reached by nothing but imports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reach is what a module declares rather than what a walk of the tree turns up.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-14T22:04:03.304Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
