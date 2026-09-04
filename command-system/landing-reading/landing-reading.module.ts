import type { Module } from "@akasha/code-system/module"

export const landingReading = {
  id: "01a06dc1-7f50-78ab-b4c7-e9d9290ad691",
  pageTypeSlug: "module",
  slug: "landing-reading",
  definition: "what a landing records as read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body the caller asked for is recorded as read by whoever landed that body.",
    },
    {
      invariantKind: "departure",
      statement: "A landing naming no agent records nothing as read.",
    },
    {
      invariantKind: "departure",
      statement: "A body going away is recorded as read by nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A body is recorded as it landed rather than as it was handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A reading the caller already holds is what a landing is held to.",
    },
    {
      invariantKind: "departure",
      statement: "A path the caller holds no reading of is left out rather than made up.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a landing.",
    },
  ],
} as const satisfies Module
