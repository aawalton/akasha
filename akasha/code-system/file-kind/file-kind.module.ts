import type { Module } from "../modules/module.page-type.ts"

export const fileKind = {
  id: "01a06553-a9b6-77a7-a681-f8ecbf29a0b3",
  pageTypeSlug: "module",
  slug: "file-kind",
  definition: "the kind of file a path's own name says the file is",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path's name alone says its kind.",
    },
    {
      invariantKind: "departure",
      statement: "A whole basename is read before any extension of it is.",
    },
    {
      invariantKind: "departure",
      statement: "A name ending `.template` is read as the same name without that ending.",
    },
    {
      invariantKind: "departure",
      statement: "A name no rule reaches says no kind rather than a kind meaning unknown.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens the file the path names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says whether a kind is text or bytes.",
    },
  ],
} as const satisfies Module
