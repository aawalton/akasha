import type { Module } from "@akasha/code-system/module"

export const transportRepos = {
  id: "01a06816-2f11-7211-912e-3de2033fc331",
  pageTypeSlug: "module",
  slug: "transport-repos",
  definition: "the repositories served here, each with its store and the copy it mirrors to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A repository is named by one word rather than by the path of its store.",
    },
    {
      invariantKind: "departure",
      statement: "A repository that mirrors nowhere states so rather than leaving it out.",
    },
    {
      invariantKind: "departure",
      statement: "A name no repository carries throws rather than answering nothing.",
    },
  ],
} as const satisfies Module
