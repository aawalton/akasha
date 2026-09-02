import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const base64url = {
  id: "01a060b3-77c9-7461-8481-e41383ba9583",
  pageTypeSlug: "module",
  slug: "base64url",
  definition: "the sixty-four characters a byte array is carried by, safe inside a URL",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Three bytes are written as four characters.",
    },
    {
      invariantKind: "departure",
      statement: "A last group short of three bytes is written without padding.",
    },
    {
      invariantKind: "departure",
      statement: "The last two characters of the alphabet are the hyphen and the underscore.",
    },
    {
      invariantKind: "departure",
      statement: "A character outside the alphabet is read as zero.",
    },
  ],
} as const satisfies Module
