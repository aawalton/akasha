import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const within = {
  id: "01a0d95d-0562-714c-8914-f348cfcafc50",
  type: "page-type/argument",
  slug: "within",
  said: "--within",
  takes: "a file or folder in the repository searched, said from the repository root",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
