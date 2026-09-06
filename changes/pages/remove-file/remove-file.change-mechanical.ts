import type { ChangeMechanical } from "../../mechanical/change-mechanical.page-type.ts"

export const removeFile = {
  id: "01a07744-1311-748c-a35b-3ebe72349dee",
  pageTypeSlug: "change-mechanical",
  slug: "remove-file",
  definition: "one file taken away, with nothing else judged",
  code: "ts",
  test: "ts",
  isCommand: false,
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path holding no body is refused rather than taken away.",
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
} as const satisfies ChangeMechanical
