import type { ChangeMechanical } from "../../change-mechanical.page-type.ts"

export const renameLocalVariable = {
  id: "01a07718-c9b5-7a1b-822f-308aef9ac22a",
  pageTypeSlug: "change-mechanical",
  slug: "rename-local-variable",
  definition: "the change spelling a local binding and its references anew in one file",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeMechanical
