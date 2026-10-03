import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const issuesFile = {
  id: "01a0deca-7611-72ca-959b-a6f02ca34826",
  type: "page-type/argument",
  slug: "issues-file",
  said: "--issues-file",
  takes: "the file a reviewer's or a mechanics recorder's issues are read from, one to a line",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
