import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const keptRecord = {
  id: "01a0ea39-db28-7af4-bd98-6194d89551cb",
  type: "page-type/argument",
  slug: "kept-record",
  said: "--record",
  takes: "the number a list gives an edit kept beside a turn",
  value: "whole-number",
  placeholder: "number",
} as const satisfies Argument
