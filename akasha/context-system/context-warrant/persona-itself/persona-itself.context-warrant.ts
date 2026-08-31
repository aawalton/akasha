import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const personaItself = {
  id: "01a05829-80ea-715a-a36e-e239ce488324",
  pageTypeSlug: "context-warrant",
  slug: "persona-itself",
  definition: "what a seat must read for the persona it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat warrants the persona it states.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no persona warrants none.",
    },
    {
      invariantKind: "departure",
      statement: "A persona whose page cannot be found is no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "Only a seat warrants a persona.",
    },
    {
      invariantKind: "departure",
      statement: "A persona is named by its slug wherever the seat states it under a page type.",
    },
  ],
} as const satisfies ContextWarrant
