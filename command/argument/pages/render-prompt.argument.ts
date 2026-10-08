import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const renderPrompt = {
  id: "01a09512-a8c0-753f-ae4d-e53c37a7a4c5",
  type: "page-type/argument",
  slug: "render-prompt",
  said: "--prompt",
  takes: "what the render is asked for",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T10:03:43.168Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
