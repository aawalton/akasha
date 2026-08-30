import type { Module } from "../../code-system/module/module.page-type.ts"

export const faultSaying = {
  id: "01a04fea-ace5-7d39-9830-e4793edb0b2c",
  pageTypeSlug: "module",
  slug: "fault-saying",
  definition: "what a thrown thing says, for a refusal to carry",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What is thrown is read for a message and made to speak either way whether or not it is an Error.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal carries what is said in one line.",
    },
    {
      invariantKind: "departure",
      statement: "A caller keeping the fault wants what is said whole.",
    },
    {
      invariantKind: "departure",
      statement: "Shaping a line stands apart from reading a thrown thing.",
    },
    {
      invariantKind: "departure",
      statement: "A reason worked out rather than thrown is carried by the same rule.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides that a fault refuses anything or with what code.",
    },
    {
      invariantKind: "absence",
      statement: "A caller catching one says what it means.",
    },
    {
      invariantKind: "absence",
      statement: "This only says what it said.",
    },
    {
      invariantKind: "gap",
      statement: "Nine places outside command-system read a thrown thing for its message by hand.",
    },
    {
      invariantKind: "gap",
      statement: "They cannot reach this.",
    },
    {
      invariantKind: "gap",
      statement: "The rule is said here and spelled there.",
    },
  ],
} as const satisfies Module
