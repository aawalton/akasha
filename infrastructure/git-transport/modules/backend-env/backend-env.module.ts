import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const backendEnv = {
  id: "01a06816-2f11-7757-88ad-94ef5cc38f0f",
  type: "module",
  slug: "backend-env",
  definition: "what the git http backend is told about a request",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The store the backend serves out of is named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every repository in that store is exported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gzipped body has no length.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The backend reads to the end of that body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name the environment does not carry falls back to the value spelled here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing but the names spelled here reaches the backend.",
    },
  ],
} as const satisfies Module
