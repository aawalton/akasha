import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const captureText = {
  id: "01a0d42f-27cb-7900-9c8f-34da29febeb8",
  type: "page-type/module",
  slug: "capture-text",
  definition: "the text of a file a generator reads, or nothing where no such file can be read",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that cannot be read is answered as nothing rather than raising.",
    },
  ],
} as const satisfies Module
