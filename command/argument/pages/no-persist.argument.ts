import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const noPersist = {
  id: "01a094b6-9a6b-7f96-b85e-650a0457eed1",
  type: "page-type/argument",
  slug: "no-persist",
  said: "--no-persist",
  takes: "leave what was written where it is and file no page for it",
  value: "none",
  createdAt: "2026-09-12T08:23:10.187Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
