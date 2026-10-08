import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const checklistFile = {
  id: "01a09484-1d01-7e32-aadb-035586cab4b5",
  type: "page-type/argument",
  slug: "checklist-file",
  said: "--checklist-file",
  takes: "the file that question is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T07:28:01.281Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
