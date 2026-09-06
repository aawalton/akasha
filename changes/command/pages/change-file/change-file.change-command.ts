import type { ChangeCommand } from "../../change-command.page-type.ts"

export const changeFile = {
  id: "01a07813-6e3d-7d39-a28a-164766ab0fed",
  pageTypeSlug: "change-command",
  slug: "change-file",
  definition: "one passage of one body replaced, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  isCommand: true,
  runsChecks: true,
  readersOweReading: true,
  writerOwesReading: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The arguments are read here rather than trusted.",
    },
    {
      invariantKind: "departure",
      statement: "An argument this change is handed no value for is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "The passage and the replacement are two arguments.",
    },
    {
      invariantKind: "departure",
      statement: "Working the passage is left to the partial this change runs.",
    },
    {
      invariantKind: "absence",
      statement: "No guard runs here.",
    },
    {
      invariantKind: "departure",
      statement: "The checks judge the tree the edits leave.",
    },
  ],
} as const satisfies ChangeCommand
