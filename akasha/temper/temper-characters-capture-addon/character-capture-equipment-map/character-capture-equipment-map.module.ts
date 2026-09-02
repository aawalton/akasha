import type { Module } from "@akasha/code-system/module"

export const characterCaptureEquipmentMap = {
  id: "01a0616b-618d-790e-b832-fb5fba674711",
  pageTypeSlug: "module",
  slug: "character-capture-equipment-map",
  definition: "each trait, glyph and weapon type against its place in a build hash",
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
