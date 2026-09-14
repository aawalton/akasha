import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const callReading = {
  id: "01a0a219-c8cd-7000-b0ba-e52ad338d390",
  type: "module",
  slug: "call-reading",
  definition: "what a call carries, read off its body into what the pages take",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is read into what the pages take before anything acts on it.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is no JSON object is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the key the fault is under.",
    },
    {
      invariantKind: "departure",
      statement: "A key no reader here knows is left out of what the pages take.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers a call.",
    },
  ],
} as const satisfies Module
