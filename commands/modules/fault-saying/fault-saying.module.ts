import type { Module } from "@akasha/code/module"

export const faultSaying = {
  id: "01a04fea-ace5-7d39-9830-e4793edb0b2c",
  pageTypeSlug: "module",
  type: "module",
  slug: "fault-saying",
  definition: "what a thrown thing says, for a refusal to carry",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A thrown thing is read for a message.",
    },
    {
      invariantKind: "departure",
      statement: "A thrown thing is made to speak even where that thing is no Error.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal has the message in one line.",
    },
    {
      invariantKind: "departure",
      statement: "A caller keeping the fault wants the message whole.",
    },
    {
      invariantKind: "departure",
      statement: "Shaping a line is separate from reading a thrown thing.",
    },
    {
      invariantKind: "departure",
      statement: "A reason worked out rather than thrown is carried by the same rule.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reader outside command-system reaches this module by the name the manifest gives that module.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides that a fault refuses anything or with what code.",
    },
    {
      invariantKind: "absence",
      statement: "A caller catching a fault says that fault's meaning.",
    },
    {
      invariantKind: "departure",
      statement: "Where a fault was thrown is read from the stack the fault has.",
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
      statement: "The message has no frame.",
    },
  ],
} as const satisfies Module
