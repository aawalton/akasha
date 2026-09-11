import type { Module } from "../../modules/module.page-type.types.ts"

export const healthAnswer = {
  id: "01a08e21-9f54-79c6-8ffa-ace8826c7494",
  pageTypeSlug: "module",
  type: "module",
  slug: "health-answer",
  definition: "what a router app answers a health check with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A health check is answered without reading anything the app depends on.",
    },
  ],
} as const satisfies Module
