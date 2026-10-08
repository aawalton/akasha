import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const toPosition = {
  id: "01a09513-aee8-75a1-8762-46065da7b633",
  type: "page-type/argument",
  slug: "to-position",
  said: "--to",
  takes: "the position the rule moves to, counted over the rules a person wrote",
  value: "whole-number",
  placeholder: "index",
  createdAt: "2026-09-12T10:04:50.280Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
