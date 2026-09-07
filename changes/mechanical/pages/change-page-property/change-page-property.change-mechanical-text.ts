import type { ChangeMechanicalText } from "../../text/change-mechanical-text.page-type.ts"

export const changePageProperty = {
  id: "01a07716-76a6-7428-9e18-f3fc32d18085",
  pageTypeSlug: "change-mechanical-text",
  slug: "change-page-property",
  changeModeSlug: "change-mode-change",
  changeTargetTypeSlug: "change-target-type/file-content",
  changeTargetSubtypeSlug: "change-target-subtype/page-property-prose",
  definition: "one key of a page's exported object stated anew",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeMechanicalText
