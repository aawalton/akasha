import type { ChangeChecked } from "../../change-checked.page-type.ts"

export const renameCodeToken = {
  id: "01a07718-c9b6-7d80-aebd-b1155f08ab77",
  pageTypeSlug: "change-checked",
  slug: "rename-code-token",
  definition: "a name a code file declares renamed wherever it reaches, exported or not",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeChecked
