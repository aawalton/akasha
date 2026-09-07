import type { ChangeChecked } from "../../change-checked.page-type.ts"

export const renamePage = {
  id: "01a07718-c9b6-7e8c-bc13-5927529ac249",
  pageTypeSlug: "change-checked",
  slug: "rename-page",
  changeModeSlug: "change-mode-rename",
  definition: "a page renamed and carried to where its slug says, in the data and in every name",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeChecked
