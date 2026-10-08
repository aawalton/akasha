import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const startMode = {
  id: "01a094e1-4465-7146-8490-eac1d8e78d76",
  type: "page-type/argument",
  slug: "start-mode",
  said: "--start-mode",
  takes: "`interactive` or `headless`, which is whether a terminal is attached",
  value: "text",
  placeholder: "mode",
  createdAt: "2026-09-12T09:09:46.213Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
