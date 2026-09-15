import type { ChangeKind } from "akasha/change/kind/change-kind.page-type.types.ts"

export const changeNone = {
  id: "01a05e59-9926-76d2-8dca-b8d061081c34",
  type: "change-kind",
  slug: "change-none",
  definition: "an act that edits nothing",
  runsChecks: false,
  writerOwesReading: false,
  readersOweReading: false,
} as const satisfies ChangeKind
