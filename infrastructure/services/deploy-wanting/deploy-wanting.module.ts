import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deployWanting = {
  id: "01a09583-2ca7-7a92-9597-d7a2e1b8780b",
  type: "module",
  slug: "deploy-wanting",
  definition: "whether a commit changed what a service is built from since that service was put up",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service nothing has put up yet wants a deploy.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service whose kept commit git will not resolve is read as one nothing has put up.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service wants a deploy where a file it is built from differs between the two commits.",
    },
    {
      invariantKind: "departure",
      statement: "What a service is built from is worked out only where some file differs at all.",
    },
    {
      invariantKind: "departure",
      statement:
        "The workstation kind is built from the union of every workstation service's files.",
    },
    {
      invariantKind: "departure",
      statement: "How far behind a service is, is when the commit it put up was made.",
    },
    {
      invariantKind: "departure",
      statement:
        "A commit git names no moment for leaves the service as far behind as one never put up.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here chooses which service is deployed next.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here puts anything up.",
    },
    {
      invariantKind: "departure",
      statement: "Every candidate of one kind is weighed against one reading of the commit.",
    },
  ],
} as const satisfies Module
