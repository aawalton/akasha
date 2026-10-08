import type { ChangeKind } from "akasha/change/kind/change-kind.page-type.types.ts"

export const changeNone = {
  id: "01a05e59-9926-76d2-8dca-b8d061081c34",
  type: "page-type/change-kind",
  slug: "change-none",
  definition: "an act that edits nothing",
  runsChecks: false,
  writerOwesReading: false,
  readersOweReading: false,
  createdAt: "2026-09-01T19:02:05.350Z",
  updatedAt: "2026-09-15T16:08:54.000Z",
} as const satisfies ChangeKind
