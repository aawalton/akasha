import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const dockerfileExtensions = {
  id: "01a06865-abff-7002-982c-70fcb1c90980",
  pageTypeSlug: "module",
  type: "module",
  slug: "dockerfile-extensions",
  definition: "what an image adds to the Dockerfile written for it, read off the file beside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement:
        "No reader here reaches `text-at`, because each answers undefined rather than nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A reader here keeps empty text as empty text.",
    },
  ],
} as const satisfies Module
