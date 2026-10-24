import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const principal = {
  id: "01a094e7-9750-7bc2-b8ba-a2f51692d826",
  type: "page-type/argument",
  slug: "principal",
  said: "--principal",
  takes:
    "who this seat's output is for — a person, persons joined by commas, or `agent` for the fleet",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-12T09:16:40.656Z",
  updatedAt: "2026-10-24T18:05:35.764Z",
} as const satisfies Argument
