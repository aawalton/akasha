import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const subagent = {
  id: "01a09c5e-fffb-70f6-b8cd-1a9460f4a318",
  type: "argument",
  slug: "subagent",
  said: "--subagent",
  takes: "the subagent acted on, named as that subagent's page is named",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
