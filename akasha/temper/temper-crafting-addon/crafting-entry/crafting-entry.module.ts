import type { Module } from "@akasha/code-system/module"

export const craftingEntry = {
  id: "01a061c7-e876-7f08-b1a4-1e310bdd2cde",
  pageTypeSlug: "module",
  slug: "crafting-entry",
  definition: "the file the game loads first, which wires the add-on to its start",
  code: "ts",
} as const satisfies Module
