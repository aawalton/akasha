import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const stage = {
  id: "01a094a3-86a2-7219-a3c3-7c73fa626c96",
  type: "page-type/argument",
  slug: "stage",
  said: "--stage",
  takes: "the directory the bodies are staged in",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T08:02:19.938Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
