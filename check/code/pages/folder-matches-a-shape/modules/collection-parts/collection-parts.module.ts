import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collectionParts = {
  id: "01a09ec3-da54-7a58-9554-ea6fd937fd5f",
  type: "page-type/module",
  slug: "collection-parts",
  definition:
    "how a folder of a collection's parts is judged, whatever those parts name as holding them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page in the folder is of a page type handed in or extending one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which page types those are is handed in rather than worked out here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page names what holds them as holding it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What holds them is handed in rather than worked out here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that is neither a page nor a file beside one is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file beside no page in this folder is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding no page at all is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the page above the folder.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the name of the folder it judges.",
    },
  ],
} as const satisfies Module
