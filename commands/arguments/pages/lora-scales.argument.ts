import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const loraScales = {
  id: "01a094d9-0583-716c-bf9e-dac70819139c",
  type: "argument",
  slug: "lora-scales",
  said: "--lora-scales",
  takes: "how strongly that checkpoint is mixed in",
  value: "text",
  placeholder: "f",
} as const satisfies Argument
