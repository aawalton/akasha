import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const regrade = {
  id: "01a0c59e-0d6f-78e1-8f12-306b350554e3",
  type: "page-type/argument",
  slug: "regrade",
  said: "--regrade",
  takes: "write over a grade a part already carries",
  value: "none",
} as const satisfies Argument
