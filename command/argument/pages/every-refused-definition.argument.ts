import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const everyRefusedDefinition = {
  id: "01a0d9aa-7c59-712c-938f-8fa951ec7baf",
  type: "page-type/argument",
  slug: "every-refused-definition",
  said: "--all",
  takes: "every definition the grammar refuses rather than the first `--first`",
  value: "none",
} as const satisfies Argument
