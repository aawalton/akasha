import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const email = {
  id: "01a094e9-e8ac-7bd3-9059-95efb73c0985",
  type: "page-type/argument",
  slug: "email",
  said: "--email",
  takes: "the address the account signs in as",
  value: "text",
  placeholder: "address",
  createdAt: "2026-09-12T09:19:12.556Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
