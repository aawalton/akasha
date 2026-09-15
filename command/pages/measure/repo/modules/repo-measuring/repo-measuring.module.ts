import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const repoMeasuring = {
  id: "01a05a0e-6376-7000-a013-86be99eb36e0",
  type: "module",
  slug: "repo-measuring",
  definition:
    "how many files of each type the checkout holds, and how many lines those files run to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file the checkout has is counted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generated file is not counted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file type is the text following the last dot in a name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name with no dot is its own type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name whose only dot opens that name is its own type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that could not be read is counted with no lines.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that could not be read is named under the total.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Types are ordered by how many lines each type has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The total is every type counted rather than every path git listed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
