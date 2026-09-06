import type { Module } from "@akasha/code/module"

export const remediationDoc = {
  id: "01a06829-124f-7b25-bc32-0301847e9b74",
  pageTypeSlug: "module",
  slug: "remediation-doc",
  definition: "where a reader is sent to fix what a check refused",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A remediation is a path into the repository or a hint written in place.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path is refused unless that path sits under apps or docs or infra or scripts or tools.",
    },
    {
      invariantKind: "departure",
      statement: "A path ending in markdown is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A hint naming the instructions tree is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A string not known at the type is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every refusal here is made where the code is read rather than where that code runs.",
    },
    {
      invariantKind: "departure",
      statement: "A remediation is told apart from any other string by its brand.",
    },
  ],
} as const satisfies Module
