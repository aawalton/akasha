import type { Module } from "@akasha/code-system/module"

export const seatParentlessRefusal = {
  id: "01a0686d-9d5e-7014-b9a1-392193b1b6a8",
  pageTypeSlug: "module",
  slug: "seat-parentless-refusal",
  definition: "the refusal a seat working for the fleet meets when it names no agent above it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat a person opened needs no parent, that person having opened it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat working for the fleet and naming nobody above it is invisible to every walk of the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A parent stated as an empty string is no parent.",
    },
  ],
} as const satisfies Module
