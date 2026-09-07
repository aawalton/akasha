import type { ChangeMechanicalData } from "../../data/change-mechanical-data.page-type.ts"

export const renamePageSlug = {
  id: "01a07718-c9b6-7230-ae96-ff2f36a19ec1",
  pageTypeSlug: "change-mechanical-data",
  slug: "rename-page-slug",
  changeModeSlug: "change-mode-rename",
  changeTargetTypeSlug: "change-target-type/file-content",
  changeTargetSubtypeSlug: "change-target-subtype/page-property",
  definition: "one page's slug restated in its own body and in the data of every page naming it",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeMechanicalData
