import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const serviceSlugArguing = {
  id: "01a09407-55ef-79d5-85ef-445fbc8909bc",
  type: "module",
  slug: "service-slug-arguing",
  definition: "the one service a call names, read off the command line",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The flags a command takes are handed in rather than known here.",
    },
    {
      invariantKind: "departure",
      statement: "A flag the command does not take is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no service is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming two services is refused rather than chosen between.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a service page.",
    },
  ],
} as const satisfies Module
