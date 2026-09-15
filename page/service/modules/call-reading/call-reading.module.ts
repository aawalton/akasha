import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const callReading = {
  id: "01a0a219-c8cd-7000-b0ba-e52ad338d390",
  type: "module",
  slug: "call-reading",
  definition: "what a call carries, read off its body into what the pages take",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is read into what the pages take before anything acts on it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that is no JSON object is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the key the fault is under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key no reader here knows is left out of what the pages take.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here answers a call.",
    },
  ],
} as const satisfies Module
