import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const acquire = {
  id: "01a05b69-453d-7baf-9785-452b40c60767",
  type: "page-type/module",
  slug: "acquire",
  definition: "the record of which shapes and slugs are asked for and which are ready",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape is ready only once its own answer arrives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type named by an empty slug is refused where it is asked for.",
    },
  ],
  createdAt: "2026-09-01T05:20:20.797Z",
  updatedAt: "2026-09-25T19:57:59.000Z",
} as const satisfies Module
