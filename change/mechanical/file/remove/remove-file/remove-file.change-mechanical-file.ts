import type { ChangeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.types.ts"

export const removeFile = {
  id: "01a07744-1311-748c-a35b-3ebe72349dee",
  type: "page-type/change-mechanical-file",
  slug: "remove-file",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "a file taken away, with nothing else judged",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path with no body is refused rather than taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here judges whether a file may go.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The calling change judges whether a file may go.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A directory is left to the landing rather than taken away here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk or an index.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFile
