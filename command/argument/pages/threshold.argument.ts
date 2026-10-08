import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const threshold = {
  id: "01a094cc-2580-7b02-964a-8e3748a0ba5e",
  type: "page-type/argument",
  slug: "threshold",
  said: "--threshold",
  takes: "the cutoff a row is kept in the answer by",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T08:46:42.048Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
