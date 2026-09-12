import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const keep = {
  id: "01a094fe-7e7c-7804-aee7-fde3c29293d6",
  type: "argument",
  slug: "keep",
  said: "--keep",
  takes: "leave the gateway running and say the process id to stop it by",
  value: "none",
} as const satisfies Argument
