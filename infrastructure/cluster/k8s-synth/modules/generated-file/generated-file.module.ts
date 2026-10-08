import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const generatedFile = {
  id: "01a06810-0b68-7fc5-b1b3-8bd0a620be5a",
  type: "page-type/module",
  slug: "generated-file",
  definition: "the generated file holding a synth's output",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A generated file sits in a `generated` folder beside its synth file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file already with the bytes that would be written is left alone.",
    },
  ],
  createdAt: "2026-09-03T16:17:57.096Z",
  updatedAt: "2026-09-22T13:59:52.000Z",
} as const satisfies Module
