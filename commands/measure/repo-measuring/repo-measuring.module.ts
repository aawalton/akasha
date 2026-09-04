import type { Module } from "@akasha/code-system/module"

export const repoMeasuring = {
  id: "01a05a0e-6376-7000-a013-86be99eb36e0",
  pageTypeSlug: "module",
  slug: "repo-measuring",
  definition:
    "how many files of each type the checkout holds, and how many lines those files run to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every file the checkout holds is counted.",
    },
    {
      invariantKind: "departure",
      statement: "A generated file is not counted.",
    },
    {
      invariantKind: "departure",
      statement: "A file type is what follows the last dot in a name.",
    },
    {
      invariantKind: "departure",
      statement: "A name holding no dot is its own type.",
    },
    {
      invariantKind: "departure",
      statement: "A name whose only dot opens that name is its own type.",
    },
    {
      invariantKind: "departure",
      statement: "A file that could not be read is counted with no lines.",
    },
    {
      invariantKind: "departure",
      statement: "A file that could not be read is named under the total.",
    },
    {
      invariantKind: "departure",
      statement: "Types are ordered by how many lines each type holds.",
    },
    {
      invariantKind: "departure",
      statement: "The total is every type counted rather than every path git listed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
