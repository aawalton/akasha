import type { ChangeKind } from "../change-kind.page-type.ts"

export const changeNone = {
  id: "01a05e59-9926-76d2-8dca-b8d061081c34",
  pageTypeSlug: "change-kind",
  type: "change-kind",
  slug: "change-none",
  definition: "an act that edits nothing",
  pluralSlug: "change-none",
  runsChecks: false,
  writerOwesReading: false,
  readersOweReading: false,
} as const satisfies ChangeKind
