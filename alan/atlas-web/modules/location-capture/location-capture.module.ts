import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const locationCapture = {
  id: "01a06582-6b30-7826-936e-11f37187f8d8",
  type: "page-type/module",
  slug: "location-capture",
  definition: "a location the plugin reports turned into a point and held in a buffer",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved buffer is read point by point, and every valid point in it is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading names how many points it refused and why the first was refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved buffer that is not a list of points in JSON is read as unreadable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sequence starts past every point already buffered.",
    },
  ],
} as const satisfies Module
