import type { Module } from "@akasha/code/module"

export const preparationRepoMending = {
  id: "01a0815e-ccda-78ba-8bbf-c3dc6558f330",
  pageTypeSlug: "module",
  slug: "preparation-repo-mending",
  definition: "a bare repository found damaged, set aside and started again",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Whether the object store is damaged is settled without reaching the network.",
    },
    {
      invariantKind: "departure",
      statement: "A fetch that failed on transport leaves the repository where it is.",
    },
    {
      invariantKind: "departure",
      statement: "A signature of transport or of the placeholder race is read before any other.",
    },
    {
      invariantKind: "departure",
      statement:
        "A damaged repository is set aside under a name carrying the time it was set aside.",
    },
    {
      invariantKind: "departure",
      statement: "Every repository set aside or taken away is said aloud.",
    },
    {
      invariantKind: "departure",
      statement: "The repository started again collects nothing of its own accord.",
    },
  ],
} as const satisfies Module
