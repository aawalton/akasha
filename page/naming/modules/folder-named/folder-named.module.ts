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
  ],
} as const satisfies Module
