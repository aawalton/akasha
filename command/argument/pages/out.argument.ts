import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const out = {
  id: "01a0c4c8-583e-7e1e-9893-460b7b9174a2",
  type: "page-type/argument",
  slug: "out",
  said: "--out",
  takes: "the file what is made is written to",
  value: "path",
  placeholder: "file",
} as const satisfies Argument
