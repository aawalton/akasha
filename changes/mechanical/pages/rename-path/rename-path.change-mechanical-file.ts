import type { ChangeMechanicalFile } from "../../file/change-mechanical-file.page-type.ts"

export const renamePath = {
  id: "01a07718-c9b6-7bb2-9eb2-27a44ed4fe7d",
  pageTypeSlug: "change-mechanical-file",
  slug: "rename-path",
  changeModeSlug: "change-mode-rename",
  definition: "one file's path changed, with every body importing it repointed",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeMechanicalFile
