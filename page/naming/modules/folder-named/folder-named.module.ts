import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const folderNamed = {
  id: "01a0a30c-d773-7c2d-812f-6f616bead399",
  type: "page-type/module",
  slug: "folder-named",
  definition: "the name a folder takes under the page above it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The files a folder holds are read through the listing the caller hands in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a folder is named for is the one page that folder holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file other than a page beside that page leaves the folder named for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain beside a workspace names the folder the two share.",
    },
  ],
  createdAt: "2026-09-15T03:12:02.931Z",
  updatedAt: "2026-09-25T14:50:28.000Z",
} as const satisfies Module
