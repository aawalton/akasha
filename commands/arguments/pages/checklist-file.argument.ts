import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const checklistFile = {
  id: "01a09484-1d01-7e32-aadb-035586cab4b5",
  type: "argument",
  slug: "checklist-file",
  said: "--checklist-file",
  takes: "the file that question is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
