import type { Module } from "@akasha/code-system/module"

export const characterCaptureClassMap = {
  id: "01a0616b-83c5-7863-8ef6-9a4458d16ae4",
  pageTypeSlug: "module",
  slug: "character-capture-class-map",
  definition: "each class's game id against its place in a build hash",
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
