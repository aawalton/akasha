import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const valueFile = {
  id: "01a15481-7e6e-7069-afde-6771a0221742",
  type: "page-type/argument",
  slug: "value-file",
  said: "--value-file",
  takes: "the file a secret's value is read from, in place of what is piped in",
  value: "path",
  placeholder: "path",
  createdAt: "2026-10-19T14:12:15.085Z",
  updatedAt: "2026-10-19T14:12:15.085Z",
} as const satisfies Argument
