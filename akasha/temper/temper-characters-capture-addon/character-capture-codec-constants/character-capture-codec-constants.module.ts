import type { Module } from "@akasha/code-system/module"

export const characterCaptureCodecConstants = {
  id: "01a0616b-920d-7fd7-8efb-04f9df5edf75",
  pageTypeSlug: "module",
  slug: "character-capture-codec-constants",
  definition: "how many bits a build hash gives each field, and which hash version this is",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A place in this table is the number a saved build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "An entry moved to another place misreads every build hash already saved.",
    },
  ],
} as const satisfies Module
