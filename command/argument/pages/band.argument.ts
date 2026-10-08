import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const band = {
  id: "01a0a03c-1bef-7e09-8ae3-6cfacd67a153",
  type: "page-type/argument",
  slug: "band",
  said: "--band",
  takes: "the rating band the model plays at",
  value: "whole-number",
  placeholder: "elo",
  default: "1500",
  createdAt: "2026-09-14T14:04:49.007Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
