import type { Module } from "@akasha/code-system/module"

export const characterCaptureChampionPointMap = {
  id: "01a0616b-23c3-7958-8a1f-21a8646a50db",
  pageTypeSlug: "module",
  slug: "character-capture-champion-point-map",
  definition: "each champion point star's game id against its place in a build hash",
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
