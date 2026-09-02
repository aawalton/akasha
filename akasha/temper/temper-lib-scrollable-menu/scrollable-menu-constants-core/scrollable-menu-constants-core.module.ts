import type { Module } from "@akasha/code-system/module"

export const scrollableMenuConstantsCore = {
  id: "01a06275-c446-7bcd-a095-f1cc9733c1aa",
  pageTypeSlug: "module",
  slug: "scrollable-menu-constants-core",
  definition: "the constants the library defines before any other module runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Interface colours are read from the running game at load time.",
    },
    {
      invariantKind: "departure",
      statement: "Entry-type numbers are copied onto the library table under their own names.",
    },
    {
      invariantKind: "departure",
      statement: "The debug table is created here with both debug switches off.",
    },
    {
      invariantKind: "constraint",
      statement: "The library version is a literal string in the source.",
    },
  ],
} as const satisfies Module
