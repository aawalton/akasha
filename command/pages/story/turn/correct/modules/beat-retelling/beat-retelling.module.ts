import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatRetelling = {
  id: "01a18331-60a5-707f-8d56-c724b1541b42",
  type: "page-type/module",
  slug: "beat-retelling",
  definition: "the prose one shown beat's correction writes on its line and in its prose file",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A prose file that is the beats' prose end to end is written again from them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other prose file has the beat's old prose replaced, where it holds it once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's beat keeps its paragraphs and whether it continues the one before.",
    },
  ],
  createdAt: "2026-10-28T15:46:53.732Z",
  updatedAt: "2026-10-28T15:46:53.732Z",
} as const satisfies Module
