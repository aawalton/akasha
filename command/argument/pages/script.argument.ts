import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const script = {
  id: "01a094c4-6ff6-737c-9f0b-cecd2c80ad24",
  type: "page-type/argument",
  slug: "script",
  said: "--script",
  takes: "the script run, `-` reading it from what is piped in",
  value: "text",
  placeholder: "js",
  createdAt: "2026-09-12T08:38:16.822Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
