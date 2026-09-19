import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const plan = {
  id: "01a0bab3-ef7d-7819-85b5-afbbf9fabd7c",
  type: "page-type/argument",
  slug: "plan",
  said: "--plan",
  takes: "report what the run would do and do none of it",
  value: "none",
} as const satisfies Argument
