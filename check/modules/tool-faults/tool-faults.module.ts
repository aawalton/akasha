import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const toolFaults = {
  id: "01a0d58c-dd8a-7565-8c20-4353c938ed7e",
  type: "page-type/module",
  slug: "tool-faults",
  definition: "the faults a tool outside akasha finds in the files a check hands that tool",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The files a tool is handed are the ones of its kind the change writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the change takes away is handed to no tool.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every fault is answered against the file the fault is in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The faults are answered in the order the faults are in the files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tool that could not look is answered as unmeasured against the first file.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The mirror's root is taken out of the reason reported.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a tool or says what a fault is.",
    },
  ],
} as const satisfies Module
