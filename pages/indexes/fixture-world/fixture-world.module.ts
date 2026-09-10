import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const fixtureWorld = {
  id: "01a088b6-9456-73ee-9f1f-a92536a61b7b",
  pageTypeSlug: "module",
  type: "module",
  slug: "fixture-world",
  definition: "the world of pages a test is set up with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A world is built once and copied for each test that asks for that world.",
    },
    {
      invariantKind: "departure",
      statement: "Git packs nothing in that world on its own, so a copy reads what is there.",
    },
  ],
} as const satisfies Module
