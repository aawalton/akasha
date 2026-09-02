import type { Module } from "@akasha/code-system/module"

export const dataEncodeCharset = {
  id: "01a06061-969f-7a3f-8f90-cd7a3e2551ba",
  pageTypeSlug: "module",
  slug: "data-encode-charset",
  definition: "the alphabet a value is written in and the control characters parting values",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The alphabet holds the characters the game carries through a saved string.",
    },
    {
      invariantKind: "departure",
      statement: "The lookup each way is worked out from the alphabet as the module loads.",
    },
    {
      invariantKind: "constraint",
      statement: "A control character found in the alphabet raises an error as the module loads.",
    },
    {
      invariantKind: "departure",
      statement:
        "A control character names the reader for the characters following that character.",
    },
  ],
} as const satisfies Module
