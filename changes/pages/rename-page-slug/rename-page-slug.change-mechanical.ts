import type { ChangeMechanical } from "../../mechanical/change-mechanical.page-type.ts"

export const renamePageSlug = {
  id: "01a07718-c9b6-7230-ae96-ff2f36a19ec1",
  pageTypeSlug: "change-mechanical",
  slug: "rename-page-slug",
  definition: "one page's slug restated in its own body and in the data of every page naming it",
  code: "ts",
  test: "ts",
  isCommand: false,
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeMechanical
