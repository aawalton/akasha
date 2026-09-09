import type { Module } from "@akasha/code/module"

export const seatSpawnNameDecide = {
  id: "01a0686d-9d5e-7011-9662-a35bf698b8f6",
  pageTypeSlug: "module",
  type: "module",
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
        "A seat whose attributes name nothing and a composition that failed are different facts.",
    },
    {
      invariantKind: "absence",
      statement:
        "Neither a seat whose attributes name nothing nor a failed composition mints a name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat spelling only the role that seat defaults to has stated nothing to be named from.",
    },
  ],
} as const satisfies Module
