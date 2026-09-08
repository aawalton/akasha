import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const moveFolderBatch = {
  id: "01a081a5-730f-7410-9e88-aa6ccaa14681",
  pageTypeSlug: "change-agent",
  slug: "move-folder-batch",
  changeModeSlug: "change-mode-move",
  definition: "some of one folder's children carried to another path, with no body rewritten",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A child of the folder is carried with every file beneath that child.",
    },
    {
      invariantKind: "departure",
      statement: "The children carried are the first the names sort to.",
    },
    {
      invariantKind: "departure",
      statement: "A count above the children there are carries every child.",
    },
    {
      invariantKind: "departure",
      statement: "A folder already holding a body at a path the move would write is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no file is refused.",
    },
    {
      invariantKind: "absence",
      statement: "No body is rewritten, so a reach into the folder is left as that reach is.",
    },
    {
      invariantKind: "absence",
      statement: "No check judges a landing, as a folder half carried passes none.",
    },
    {
      invariantKind: "departure",
      statement: "The caller carries the rest of the folder before anything reads the tree again.",
    },
  ],
} as const satisfies ChangeAgent
