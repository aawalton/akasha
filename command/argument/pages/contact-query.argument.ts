import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const contactQuery = {
  id: "01a094dd-eccd-7a20-a9ca-ffc23515daa4",
  type: "page-type/argument",
  slug: "contact-query",
  said: "--query",
  takes: "the run of letters a contact's name must hold",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T09:06:07.181Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
