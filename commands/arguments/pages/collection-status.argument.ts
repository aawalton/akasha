import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const collectionStatus = {
  id: "01a09b87-8def-7251-abce-feb38b078d1e",
  type: "argument",
  slug: "collection-status",
  said: "--status",
  takes: "the one status to list, of the seven a collection states",
  value: "text",
  placeholder: "status",
} as const satisfies Argument
