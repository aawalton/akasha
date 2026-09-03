import type { Module } from "@akasha/code-system/module"

export const markdownBodyNotUtf8 = {
  id: "01a06982-39cd-7000-aaed-afa3d4b4e20b",
  pageTypeSlug: "module",
  slug: "markdown-body-not-utf8",
  definition: "the words refusing a body whose bytes are not utf8, with what was read of them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The refusal names the source it read, how many bytes stood there, and the leading bytes themselves.",
    },
  ],
} as const satisfies Module
