import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const subagent = {
  id: "01a09c5e-fffb-70f6-b8cd-1a9460f4a318",
  type: "page-type/argument",
  slug: "subagent",
  said: "--subagent",
  takes: "the subagent acted on, named as that subagent's page is named",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-13T20:04:26.747Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
