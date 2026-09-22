import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const appendLines = {
  id: "01a08c36-f87f-791e-99a3-e195153103fb",
  type: "page-type/change-mechanical-file-content",
  slug: "append-lines",
  changeMode: "change-mode/change-mode-append",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "content put at the end of what a path holds, with nothing else judged",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The content is answered as an append rather than as a whole body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Content of many lines is answered as one append rather than as one each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The content is answered as the content was handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the body the path holds.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges what the content spells.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
