import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const calendar = {
  id: "01a094bd-5602-787f-8e11-e57bddae07ba",
  type: "argument",
  slug: "calendar",
  said: "--calendar",
  takes: "the calendar to act on, where `primary` and saying nothing both name Alan's own",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
