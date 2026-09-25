import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileSize = {
  id: "01a08182-0997-7171-8a4f-afaacaf31310",
  type: "page-type/module",
  slug: "file-size",
  definition: "how many bytes a file has, and none where no file is there",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path with no file is answered as no bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path with an entry that is no file is answered as no bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is read as the caller spelled the path.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here throws.",
    },
  ],
} as const satisfies Module
