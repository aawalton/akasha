import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const seconds = {
  id: "01a094fe-e741-7b86-9e13-769de787681c",
  type: "page-type/argument",
  slug: "seconds",
  said: "--seconds",
  takes: "a number of seconds",
  value: "whole-number",
  placeholder: "seconds",
  createdAt: "2026-09-12T09:42:08.449Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
