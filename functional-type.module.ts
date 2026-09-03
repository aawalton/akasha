import type { Module } from "@akasha/code-system/module"

export const functionalType = {
  id: "01a06829-124f-7902-b251-5bba69b7b650",
  pageTypeSlug: "module",
  slug: "functional-type",
  definition: "what a workspace package is for, read off that package's manifest",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A package says what it is for in its manifest rather than by where it sits.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest that is absent answers no type.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest that will not parse answers no type rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value that is no known type answers no type and carries the raw value back with it.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest saying nothing about what it is for carries no raw value back.",
    },
    {
      invariantKind: "departure",
      statement: "A library type is one that any package may depend on.",
    },
    {
      invariantKind: "departure",
      statement: "A type carries a rank, and a package may not depend on a rank above its own.",
    },
    {
      invariantKind: "departure",
      statement: "Types sharing a rank may depend on one another.",
    },
  ],
} as const satisfies Module
