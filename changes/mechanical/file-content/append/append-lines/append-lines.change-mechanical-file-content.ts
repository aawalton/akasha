import type { ChangeMechanicalFileContent } from "akasha/changes/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const appendLines = {
  id: "01a08c36-f87f-791e-99a3-e195153103fb",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "append-lines",
  changeMode: "change-mode-append",
  changeTargetType: "change-target-type/file-content",
  definition: "content put at the end of what one path holds, with nothing else judged",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The content is answered as an append rather than as a whole body.",
    },
    {
      invariantKind: "departure",
      statement: "Content of many lines is answered as one append rather than as one each.",
    },
    {
      invariantKind: "departure",
      statement: "The content is answered as the content was handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the body the path holds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what the content spells.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
