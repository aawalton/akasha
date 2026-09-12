import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const principal = {
  id: "01a094e7-9750-7bc2-b8ba-a2f51692d826",
  type: "argument",
  slug: "principal",
  said: "--principal",
  takes: "who this seat's output is for — a person, or `agent` for the fleet",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
