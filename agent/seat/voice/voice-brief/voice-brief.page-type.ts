import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const voiceBrief = {
  id: "01a11b7e-1955-7eea-b38a-9d73c1d20551",
  type: "page-type/page-type",
  slug: "voice-brief",
  definition: "the prompt a model reads before speech between Alan and a seat",
  extends: ["page-type/page"],
  properties: [{ pageProperty: "file-property/prose", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A brief is read whenever a voice token is made, so changing one needs no deploy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`{persona}` in a brief is replaced by the name of the seat's persona.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`{tool}` in a brief is replaced by the name of the tool that asks the seat.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-08T12:30:11.285Z",
  updatedAt: "2026-10-30T14:35:25.765Z",
} as const satisfies PageType
