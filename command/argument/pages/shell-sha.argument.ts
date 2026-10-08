import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const shellSha = {
  id: "01a094c8-8da6-7f0c-8b6a-c33ad0740c67",
  type: "page-type/argument",
  slug: "shell-sha",
  said: "--shell-sha",
  takes: "the shell-repo commit the cut was taken at, where it named one",
  value: "text",
  placeholder: "sha",
  createdAt: "2026-09-12T08:42:46.566Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
