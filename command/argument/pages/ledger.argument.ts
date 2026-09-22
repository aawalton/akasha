import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const ledger = {
  id: "01a0c940-a78a-7008-8f1b-0d751ec70efc",
  type: "page-type/argument",
  slug: "ledger",
  said: "--ledger",
  takes: "the rows beside a game's page that become pages",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
