import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const uespTable = {
  id: "01a1403c-b1e2-7475-8f37-8cf248d0216f",
  type: "page-type/argument",
  slug: "uesp-table",
  said: "--uesp-table",
  takes: "UESP's skill coefficient table, saved from a browser as JSON outside the repository",
  value: "path",
  placeholder: "path",
  createdAt: "2026-10-15T15:44:41.953Z",
  updatedAt: "2026-10-15T15:44:41.953Z",
} as const satisfies Argument
