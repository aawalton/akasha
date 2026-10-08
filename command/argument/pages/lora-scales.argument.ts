import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const loraScales = {
  id: "01a094d9-0583-716c-bf9e-dac70819139c",
  type: "page-type/argument",
  slug: "lora-scales",
  said: "--lora-scales",
  takes: "how strongly that checkpoint is mixed in",
  value: "text",
  placeholder: "f",
  default: "1.0",
  createdAt: "2026-09-12T09:00:45.827Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
