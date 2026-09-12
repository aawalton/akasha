import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const renderPrompt = {
  id: "01a09512-a8c0-753f-ae4d-e53c37a7a4c5",
  type: "argument",
  slug: "render-prompt",
  said: "--prompt",
  takes: "what the render is asked for",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
