import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const filesOnly = {
  id: "01a0d95d-0562-7bb3-a813-904f206415ad",
  type: "page-type/argument",
  slug: "files-only",
  said: "--files-only",
  takes: "the path of each file that matches, and no line of it",
  value: "none",
} as const satisfies Argument
