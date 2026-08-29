import type { Module } from "../../code-system/module/module.page-type.ts"

export const grouping = {
  id: "01a04f20-abbc-7790-8f19-ff2012154823",
  pageTypeSlug: "module",
  slug: "grouping",
  definition: "several values held under one key, each gathered as it is found",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The map is changed where it stands rather than answered anew, so a walk gathering as it goes copies nothing it has already gathered.",
    },
    {
      invariantKind: "departure",
      statement:
        "Values come back in the order they were gathered, so what a walk found first reads first, and nothing here sorts.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key nothing was gathered under is not there, rather than there holding nothing, so a caller reads absent and empty as one answer.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing is said here about what a key or a value means. Two callers gathering opposite ends of the same edge both reach for this.",
    },
  ],
} as const satisfies Module
