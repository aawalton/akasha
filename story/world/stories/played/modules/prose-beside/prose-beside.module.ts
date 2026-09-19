import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proseBeside = {
  id: "01a0a161-77ae-7c52-b1d4-6e0f8a35c92b",
  type: "page-type/module",
  slug: "prose-beside",
  definition: "the prose filed beside each played turn or chapter a display is about to draw",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose read is the prose of the rows handed here and of no other row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prose property answering its own ending rather than a body reads as unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row whose prose went unread is left out rather than given empty prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read for one story's rows is dropped where the rows asked for change.",
    },
  ],
} as const satisfies Module
