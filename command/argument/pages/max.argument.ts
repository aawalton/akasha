import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const max = {
  id: "01a094df-50b9-75ef-b1d0-42ac9b83c346",
  type: "page-type/argument",
  slug: "max",
  said: "--max",
  takes: "how many rows to answer with at most",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T09:07:38.297Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
