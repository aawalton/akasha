import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markersEditorSelection = {
  id: "01a0de85-2b4b-7eb9-af64-68609811c810",
  type: "page-type/module",
  slug: "markers-editor-selection",
  definition: "the marker the editor has selected and the edits made to it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An edit is kept only once the editor's save is confirmed.",
    },
  ],
  createdAt: "2026-09-26T16:21:04.459Z",
  updatedAt: "2026-09-26T16:21:52.000Z",
} as const satisfies Module
