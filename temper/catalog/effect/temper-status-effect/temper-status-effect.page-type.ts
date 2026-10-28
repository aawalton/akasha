import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperStatusEffect = {
  id: "01a18465-a6e6-71b0-97d4-b9c95aa432ef",
  type: "page-type/page-type",
  slug: "temper-status-effect",
  definition: "a harmful effect a hit leaves on its target that deals damage of its own",
  extends: ["page-type/temper-debuff-other", "page-type/temper-ability"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A status effect's damage is worked out by its own ability equations.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A status effect's equation is the stat formula it replaced, until a fight's ticks verify it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-28T21:23:36.804Z",
  updatedAt: "2026-10-28T21:27:41.270Z",
} as const satisfies PageType
