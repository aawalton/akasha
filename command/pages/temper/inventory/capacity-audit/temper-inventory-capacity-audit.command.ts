import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryCapacityAudit = {
  id: "01a0603c-c1d1-78cf-9174-01514c3d023a",
  type: "page-type/command",
  slug: "temper-inventory-capacity-audit",
  definition: "the command naming the destinations whose storage the rules would overflow",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A destination is reported only where the slots needed run past the slots free.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An overflowing destination names the slots needed and the slots free.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An overflowing destination names the rules and items the capacity filter dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run finding no overflow reports nothing.",
    },
  ],
  name: "capacity-audit",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/inventory-path" },
    { argument: "argument/characters-path" },
  ],
} as const satisfies Command
