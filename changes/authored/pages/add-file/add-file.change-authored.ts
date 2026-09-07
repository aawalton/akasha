import type { ChangeAuthored } from "../../change-authored.page-type.ts"

export const addFile = {
  id: "01a07813-6e3b-77c3-9c1e-b0c5778fd31b",
  pageTypeSlug: "change-authored",
  slug: "add-file",
  definition: "one body written at one path, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: true,
  writerOwesReading: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body is handed in whole rather than as a passage.",
    },
    {
      invariantKind: "departure",
      statement: "Writing the body is left to the partial this change runs.",
    },
    {
      invariantKind: "departure",
      statement: "The checks judge the tree the edits leave.",
    },
  ],
} as const satisfies ChangeAuthored
