import type { Module } from "@akasha/code-system/module"

export const searching = {
  id: "01a0655b-02ef-7d66-b75b-fe13a391bc3f",
  pageTypeSlug: "module",
  slug: "searching",
  definition: "where a pattern is looked for, and how much of what is found is handed back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every argument that is not `--repo` is ripgrep's own.",
    },
    {
      invariantKind: "departure",
      statement:
        "An argument forwarded to ripgrep keeps the order the caller wrote that argument in.",
    },
    {
      invariantKind: "departure",
      statement: "The defaults are given to ripgrep before the caller's own arguments.",
    },
    {
      invariantKind: "departure",
      statement: "An argument disagreeing with a default is the one that holds.",
    },
    {
      invariantKind: "departure",
      statement: "A search naming no repository and no path searches every repository in turn.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path named is searched instead of the repositories rather than as well as the repositories.",
    },
    {
      invariantKind: "departure",
      statement: "Which arguments are paths is ripgrep's own rule rather than a rule spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "Naming a path and a repository together is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path says where to search and a repository says where to search.",
    },
    {
      invariantKind: "departure",
      statement: "A repository no root is at is named as absent rather than refusing the search.",
    },
    {
      invariantKind: "departure",
      statement:
        "Printing stops at the first of the line ceiling and the byte ceiling to be reached.",
    },
    {
      invariantKind: "departure",
      statement: "What is handed back when a ceiling is reached is the front of the answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs ripgrep.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "absence",
      statement: "A matching line is no reading of the file the line came out of.",
    },
  ],
} as const satisfies Module
