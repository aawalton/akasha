import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const untilInstant = {
  id: "01a17ef5-e639-7141-b066-42efc850a1c0",
  type: "page-type/argument",
  slug: "until-instant",
  said: "--until",
  takes: "the in-game instant no session of a montage ends after",
  value: "text",
  placeholder: "instant",
  createdAt: "2026-10-27T20:03:26.902Z",
  updatedAt: "2026-10-27T20:03:26.902Z",
} as const satisfies Argument
