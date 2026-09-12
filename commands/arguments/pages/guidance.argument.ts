import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const guidance = {
  id: "01a094bb-0c19-7d2f-b552-103f75fe616f",
  type: "argument",
  slug: "guidance",
  said: "--guidance",
  takes: "how far the sampler is pushed toward the prompt",
  value: "text",
  placeholder: "n",
} as const satisfies Argument
