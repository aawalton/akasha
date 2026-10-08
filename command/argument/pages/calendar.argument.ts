import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const calendar = {
  id: "01a094bd-5602-787f-8e11-e57bddae07ba",
  type: "page-type/argument",
  slug: "calendar",
  said: "--calendar",
  takes: "the calendar to act on, where `primary` and saying nothing both name Alan's own",
  value: "text",
  placeholder: "id",
  createdAt: "2026-09-12T08:30:31.426Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
