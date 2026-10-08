import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const collectionStatus = {
  id: "01a09b87-8def-7251-abce-feb38b078d1e",
  type: "page-type/argument",
  slug: "collection-status",
  said: "--status",
  takes: "the one status to list, of the seven a collection states",
  value: "text",
  placeholder: "status",
  createdAt: "2026-09-13T16:09:07.311Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
