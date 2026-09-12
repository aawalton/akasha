import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const packageName = {
  id: "01a094da-f59e-7f7d-8040-c50bfd7daabb",
  type: "argument",
  slug: "package-name",
  said: "--package",
  takes: "a folder under `temper/` to typecheck, said once per folder",
  value: "text",
  placeholder: "name",
  repeats: true,
} as const satisfies Argument
