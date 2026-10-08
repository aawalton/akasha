import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const engine = {
  id: "01a094d5-3496-7f0d-b6ab-a23a7df441ac",
  type: "page-type/argument",
  slug: "engine",
  said: "--engine",
  takes: "the engine the edit goes through",
  value: "text",
  placeholder: "name",
  default: "qwen",
  createdAt: "2026-09-12T08:56:35.734Z",
  updatedAt: "2026-09-28T17:54:14.000Z",
} as const satisfies Argument
