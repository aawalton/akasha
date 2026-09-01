import type { Module } from "@akasha/code-system/module"

export const macBuildSerialization = {
  id: "01a05cee-e560-7580-bebc-253f65ce563a",
  pageTypeSlug: "module",
  slug: "mac-build-serialization",
  definition: "the shell that serialises mac builds behind a directory lock and numbers each one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A lock whose recorded pid is not alive is stolen once the directory is 45 seconds old.",
    },
    {
      invariantKind: "constraint",
      statement: "The lock's age is read with a BSD stat that answers only on macOS.",
    },
    {
      invariantKind: "departure",
      statement: "The claimed build number reaches the caller only as a marked line in the output.",
    },
  ],
} as const satisfies Module
