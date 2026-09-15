import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const appendLines = {
  id: "01a08c36-f87f-791e-99a3-e195153103fb",
  type: "change-mechanical-file-content",
  slug: "append-lines",
  changeMode: "change-mode/change-mode-append",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "content put at the end of what one path holds, with nothing else judged",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The content is answered as an append rather than as a whole body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Content of many lines is answered as one append rather than as one each.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The content is answered as the content was handed in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the body the path holds.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges what the content spells.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
