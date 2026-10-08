import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const within = {
  id: "01a0d95d-0562-714c-8914-f348cfcafc50",
  type: "page-type/argument",
  slug: "within",
  said: "--within",
  takes: "a file or folder in the repository searched, said from the repository root",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-25T16:19:07.234Z",
  updatedAt: "2026-09-25T16:19:30.000Z",
} as const satisfies Argument
