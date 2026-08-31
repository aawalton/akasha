import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const changeTabooTerms = {
  id: "01a05968-4c31-7a5e-9f02-6b1d38c4e770",
  pageTypeSlug: "context-warrant",
  slug: "change-taboo-terms",
  definition: "what a seat must read for the taboo terms its change writes",
  code: "ts",
  test: "ts",
  runsOnRead: false,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A taboo term whose pattern finds the text a change adds is warranted.",
    },
    {
      invariantKind: "departure",
      statement: "Text a change leaves standing is not text it adds.",
    },
    {
      invariantKind: "departure",
      statement: "A term warrants nothing of the page stating it.",
    },
    {
      invariantKind: "departure",
      statement: "What is owed names every sense the term bars and what stands instead.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern that does not compile finds nothing rather than refusing the change.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges which sense was meant.",
    },
    {
      invariantKind: "departure",
      statement: "A change handed no bodies warrants nothing.",
    },
  ],
} as const satisfies ContextWarrant
