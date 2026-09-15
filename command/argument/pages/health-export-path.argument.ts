import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const healthExportPath = {
  id: "01a09505-b814-7a17-8d68-ae62c9e3a739",
  type: "page-type/argument",
  slug: "health-export-path",
  said: "--file-path",
  takes: "the export to read, in place of the newest export the machine holds",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
