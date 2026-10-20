import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const build = {
  id: "01a159b3-59f4-78b4-91ab-1c4b125800bb",
  type: "page-type/argument",
  slug: "build",
  said: "--build",
  takes: "a build, named by its hash, a build page's slug, a character's slug or a reading's id",
  value: "text",
  placeholder: "build",
  createdAt: "2026-10-20T14:24:48.628Z",
  updatedAt: "2026-10-20T14:24:48.628Z",
} as const satisfies Argument
