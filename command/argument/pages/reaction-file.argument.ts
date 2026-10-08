import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const reactionFile = {
  id: "01a094e5-aa06-7d5d-bda7-1f039460309c",
  type: "page-type/argument",
  slug: "reaction-file",
  said: "--reaction-file",
  takes: "the file the reaction is read from",
  value: "path",
  placeholder: "file",
  createdAt: "2026-09-12T09:14:34.374Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
