import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const changeFile = {
  id: "01a07813-6e3d-7d39-a28a-164766ab0fed",
  pageTypeSlug: "change-agent",
  slug: "change-file",
  changeModeSlug: "change-mode-change",
  definition: "one passage of one body replaced, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: true,
  writerOwesReading: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The passage and the replacement are two arguments.",
    },
    {
      invariantKind: "departure",
      statement: "Working the passage is left to the change reached.",
    },
    {
      invariantKind: "departure",
      statement: "That change is the one for the kind of body the path holds.",
    },
    {
      invariantKind: "departure",
      statement: "The checks judge the tree the edits leave.",
    },
  ],
} as const satisfies ChangeAgent
