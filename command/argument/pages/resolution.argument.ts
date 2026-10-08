import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const resolution = {
  id: "01a094d0-9578-758f-97f8-c0fdfec2af3e",
  type: "page-type/argument",
  slug: "resolution",
  said: "--resolution",
  takes: "how many pixels the shortest edge is remade at",
  value: "whole-number",
  placeholder: "px",
  createdAt: "2026-09-12T08:51:32.856Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
