import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const faultSaying = {
  id: "01a04fea-ace5-7d39-9830-e4793edb0b2c",
  type: "page-type/module",
  slug: "fault-saying",
  definition: "what a thrown thing says, for a refusal to carry",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal has the message in one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller keeping the fault wants the message whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Shaping a line is separate from reading a thrown thing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reader outside `command/` reaches this module by its path rather than by a package alias.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides that a fault refuses anything or with what code.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A caller catching a fault says that fault's meaning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a fault was thrown is read from the stack the fault has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A frame is a file path carrying the line and column the fault passed through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A frame the runtime names no file for is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How many frames are worth carrying is the caller's to say.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The message has no frame.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here holds a message to a length, so a long refusal arrives entire.",
    },
  ],
} as const satisfies Module
