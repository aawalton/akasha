import type { Module } from "@akasha/code-system/module"

export const seatSpawnNameDecide = {
  id: "01a0686d-9d5e-7011-9662-a35bf698b8f6",
  pageTypeSlug: "module",
  slug: "seat-spawn-name-decide",
  definition: "whether what a starting seat states spells a name it may be minted under",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A composition that failed refuses the start rather than falling back to a default.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat whose attributes name nothing and a composition that failed are different facts, and neither mints a name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat spelling only the role it defaults to has stated nothing to be named from.",
    },
  ],
} as const satisfies Module
