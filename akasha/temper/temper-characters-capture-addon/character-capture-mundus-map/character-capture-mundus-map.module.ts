import type { Module } from "@akasha/code-system/module"

export const characterCaptureMundusMap = {
  id: "01a0616b-0dc6-7330-8236-23addefa109d",
  pageTypeSlug: "module",
  slug: "character-capture-mundus-map",
  definition: "each mundus stone's ability id against its place in a build hash",
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
