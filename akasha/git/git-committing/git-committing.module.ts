import type { Module } from "@akasha/code-system/module"

export const gitCommitting = {
  id: "01a068ae-fd9c-7002-a92c-6db5c1336239",
  pageTypeSlug: "module",
  slug: "git-committing",
  definition: "named paths committed as one author, waiting out the index lock other writers take",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path git has never heard of is reported back rather than committed.",
    },
    {
      invariantKind: "departure",
      statement: "An ignored path is dropped from the commit rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path list that comes to nothing commits nothing and answers no sha.",
    },
    {
      invariantKind: "departure",
      statement: "A new path is given intent to add before the commit, so the commit names it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The committer is taken from the author already named rather than from the machine's git config.",
    },
    {
      invariantKind: "departure",
      statement: "An author that is no name and address is left to git to decide.",
    },
    {
      invariantKind: "departure",
      statement:
        "A held index lock is waited out, and every other failure returns on the first attempt.",
    },
    {
      invariantKind: "departure",
      statement: "A commit that fails after intent to add takes that intent back.",
    },
    {
      invariantKind: "departure",
      statement:
        "One deadline covers the whole call, so two locks in a row do not double the wait promised.",
    },
  ],
} as const satisfies Module
