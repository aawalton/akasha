import type { ChangeMechanical } from "../../change-mechanical.page-type.ts"

export const restateValue = {
  id: "01a07716-76a6-7428-9e18-f3fc32d18085",
  pageTypeSlug: "change-mechanical",
  slug: "restate-value",
  definition: "one key of a page's exported object stated anew",
  code: "ts",
  test: "ts",
  isCommand: false,
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeMechanical
