import type { Module } from "@akasha/code-system/module"

export const quoting = {
  id: "01a05d9b-277a-7001-b13d-40f361ff8e5d",
  pageTypeSlug: "module",
  slug: "quoting",
  definition: "a value written into a shell command as one literal word",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is wrapped in single quotes.",
    },
    {
      invariantKind: "departure",
      statement: "A single quote inside the value closes the quoting.",
    },
    {
      invariantKind: "departure",
      statement: "An escaped single quote follows the quoting.",
    },
    {
      invariantKind: "departure",
      statement: "The quoting opens again after the escaped single quote.",
    },
    {
      invariantKind: "departure",
      statement: "What the shell expands is left for the shell to read as text.",
    },
    {
      invariantKind: "departure",
      statement: "An empty value is answered as a pair of quotes rather than as nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here builds a command or runs a command.",
    },
  ],
} as const satisfies Module
