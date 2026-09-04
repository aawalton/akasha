import type { Module } from "../../code-system/modules/module.page-type.ts"

export const newYorkWall = {
  id: "01a05c77-31e7-7e71-b8da-309299271cd1",
  pageTypeSlug: "module",
  slug: "new-york-wall",
  definition: "the instant a New York clock read a given time, and the time it reads at one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A wall time is resolved against the offset the candidate instant lands in.",
    },
    {
      invariantKind: "departure",
      statement: "A day that will not parse answers with an instant that is no number.",
    },
  ],
} as const satisfies Module
