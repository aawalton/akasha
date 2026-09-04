import type { Module } from "@akasha/code-system/module"

export const backendEnv = {
  id: "01a06816-2f11-7757-88ad-94ef5cc38f0f",
  pageTypeSlug: "module",
  slug: "backend-env",
  definition: "what the git http backend is told about a request",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The store the backend serves out of is named here.",
    },
    {
      invariantKind: "departure",
      statement: "Every repository in that store is exported.",
    },
    {
      invariantKind: "departure",
      statement: "A gzipped body carries no length, so the backend reads to the end of it.",
    },
    {
      invariantKind: "departure",
      statement: "A name the environment does not carry falls back to what is spelled here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing but the names spelled here reaches the backend.",
    },
  ],
} as const satisfies Module
