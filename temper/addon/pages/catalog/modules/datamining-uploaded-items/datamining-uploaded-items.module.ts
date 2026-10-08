import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataminingUploadedItems = {
  id: "01a11d0c-dbf7-78be-807a-1f62f50c7062",
  type: "page-type/module",
  slug: "datamining-uploaded-items",
  definition: "which mined items the add-on keeps once the items are uploaded",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A mined item at or below the uploaded id is dropped from the saved variables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is dropped while mining is not complete.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is dropped where the upload was of another game version.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's next save writes the file without the dropped items.",
    },
  ],
  createdAt: "2026-10-08T19:45:44.439Z",
  updatedAt: "2026-10-08T19:45:44.439Z",
} as const satisfies Module
