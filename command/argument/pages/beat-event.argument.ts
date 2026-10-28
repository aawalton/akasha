import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const beatEvent = {
  id: "01a18331-60a4-7c85-9f96-c02ae4dd0cf5",
  type: "page-type/argument",
  slug: "beat-event",
  said: "--beat-event",
  takes: "the event one beat states, at most 100 characters",
  value: "text",
  placeholder: "event",
  createdAt: "2026-10-28T15:46:53.732Z",
  updatedAt: "2026-10-28T15:46:53.732Z",
} as const satisfies Argument
