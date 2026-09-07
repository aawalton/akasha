import type { ChangeMechanicalCode } from "../../code/change-mechanical-code.page-type.ts"

export const renameLocalVariable = {
  id: "01a07718-c9b5-7a1b-822f-308aef9ac22a",
  pageTypeSlug: "change-mechanical-code",
  slug: "rename-local-variable",
  definition: "the change spelling a local binding and its references anew in one file",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The offset handed in is named `spot` rather than `at`.",
    },
    {
      invariantKind: "departure",
      statement: "The path a change acts on is named `at` wherever a change is reached.",
    },
  ],
} as const satisfies ChangeMechanicalCode
