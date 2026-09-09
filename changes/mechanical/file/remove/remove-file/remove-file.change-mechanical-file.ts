import type { ChangeMechanicalFile } from "../../change-mechanical-file.page-type.ts"

export const removeFile = {
  id: "01a07744-1311-748c-a35b-3ebe72349dee",
  pageTypeSlug: "change-mechanical-file",
  slug: "remove-file",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one file taken away, with nothing else judged",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path with no body is refused rather than taken away.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here judges whether a file may go.",
    },
    {
      invariantKind: "departure",
      statement: "The calling change judges whether a file may go.",
    },
    {
      invariantKind: "departure",
      statement: "A directory is left to the landing rather than taken away here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or an index.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFile
