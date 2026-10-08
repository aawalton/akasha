import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const service = {
  id: "01a094ba-8e6b-7e12-9509-79544461b132",
  type: "page-type/argument",
  slug: "service",
  said: "--service",
  takes: "the service the work goes through",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T08:27:29.259Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
