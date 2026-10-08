import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const packageName = {
  id: "01a094da-f59e-7f7d-8040-c50bfd7daabb",
  type: "page-type/argument",
  slug: "package-name",
  said: "--package",
  takes: "a folder under `temper/` to typecheck, said once per folder",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T09:02:52.830Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
