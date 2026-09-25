import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatSpawnNameDecide = {
  id: "01a0686d-9d5e-7011-9662-a35bf698b8f6",
  type: "page-type/module",
  slug: "seat-spawn-name-decide",
  definition: "whether the attributes of a new seat make a name",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A composition that failed refuses the start rather than falling back to a default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat whose attributes name nothing and a composition that failed are different facts.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Neither a seat whose attributes name nothing nor a failed composition mints a name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat spelling only the role that seat defaults to has stated nothing to be named from.",
    },
  ],
} as const satisfies Module
