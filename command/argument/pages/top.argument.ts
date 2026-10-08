import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const top = {
  id: "01a094ca-f89b-7b31-a741-7c522f77a2aa",
  type: "page-type/argument",
  slug: "top",
  said: "--top",
  takes: "how many rows are in the answer, worst first",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T08:45:25.019Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
