import type { Module } from "@akasha/code-system/module"

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
      statement: "What is thrown is read for a message.",
    },
    {
      invariantKind: "departure",
      statement: "What is thrown is made to speak even where what is thrown is no Error.",
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
      invariantKind: "departure",
      statement: "A reader outside command-system reaches this by the name the manifest gives it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides that a fault refuses anything or with what code.",
    },
    {
      invariantKind: "absence",
      statement: "A caller catching a fault says what that fault means.",
    },
    {
      invariantKind: "departure",
      statement: "Where a fault was thrown is read from the stack the fault carries.",
    },
    {
      invariantKind: "departure",
      statement: "A frame is a file path carrying the line and column the fault passed through.",
    },
    {
      invariantKind: "departure",
      statement: "A frame the runtime names no file for is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "How many frames are worth carrying is the caller's to say.",
    },
    {
      invariantKind: "absence",
      statement: "What is said carries no frame.",
    },
  ],
} as const satisfies Module
