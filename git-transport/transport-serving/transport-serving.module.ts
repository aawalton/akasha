import type { Module } from "@akasha/code-system/module"

export const transportServing = {
  id: "01a06816-2f11-7332-be0c-24c2750a723d",
  pageTypeSlug: "module",
  slug: "transport-serving",
  definition: "the port the repositories and the questions about them are answered on",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Importing the module starts nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A question from inside the cluster carries no forwarded-for header.",
    },
    {
      invariantKind: "departure",
      statement: "A question carrying one is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A commit a question names is hex digits or the question is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A git route is authenticated before the backend is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is no repository and endpoint is answered as not found.",
    },
    {
      invariantKind: "departure",
      statement: "The questions are answered about the one repository named here.",
    },
    {
      invariantKind: "departure",
      statement: "A signal stops the server rather than killing the process under it.",
    },
  ],
} as const satisfies Module
