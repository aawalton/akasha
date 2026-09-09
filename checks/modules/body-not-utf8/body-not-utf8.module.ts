import type { Module } from "@akasha/code/module"

export const bodyNotUtf8 = {
  id: "01a06982-39cd-7000-aaed-afa3d4b4e20b",
  pageTypeSlug: "module",
  type: "module",
  slug: "body-not-utf8",
  definition: "the words refusing a body whose bytes are not utf8, with what was read of them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The refusal names the source the command read and how many bytes were there and the leading bytes.",
    },
  ],
} as const satisfies Module
