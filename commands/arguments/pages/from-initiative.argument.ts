import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const fromInitiative = {
  id: "01a094d2-263a-7a8c-ab8d-b372d59fae37",
  type: "argument",
  slug: "from-initiative",
  said: "--from",
  takes: "the initiative stating the intent now",
  value: "text",
  placeholder: "from",
} as const satisfies Argument
