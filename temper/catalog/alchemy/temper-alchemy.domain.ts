import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAlchemy = {
  id: "01a06076-1b69-7174-a838-dc7b0b111961",
  type: "page-type/domain",
  slug: "temper-alchemy",
  definition: "the potions and poisons a character brews from reagents",
  parts: ["module/poison-source", "module/potion-source"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A potion is reached by its kebab id rather than by the game's item number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Potions are read from the temper-potion pages rather than written out here.",
    },
  ],
  createdAt: "2026-09-02T04:52:28.137Z",
  updatedAt: "2026-09-27T02:14:44.000Z",
} as const satisfies Domain
