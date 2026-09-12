import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const engine = {
  id: "01a094d5-3496-7f0d-b6ab-a23a7df441ac",
  type: "argument",
  slug: "engine",
  said: "--engine",
  takes: "the engine the edit goes through",
  value: "text",
  placeholder: "name",
  default: "nano-banana",
} as const satisfies Argument
