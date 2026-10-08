import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const pod = {
  id: "01a094eb-2b5e-7dc3-a279-52a2d84c74b3",
  type: "page-type/argument",
  slug: "pod",
  said: "--pod",
  takes: "the pod name to match as a prefix, read as a literal string",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T09:20:35.166Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
