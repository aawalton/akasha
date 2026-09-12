import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const service = {
  id: "01a094ba-8e6b-7e12-9509-79544461b132",
  type: "argument",
  slug: "service",
  said: "--service",
  takes: "the service the work goes through",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
