import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionCombatMechanic = {
  id: "01a0dee9-195c-7c3e-b739-2a1dec512911",
  type: "page-type/page-type",
  slug: "temper-companion-combat-mechanic",
  definition: "a number the game holds a companion's combat to",
  extends: ["page-type/temper-companion-thing"],
  parts: ["number-property/mechanic-value"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/mechanic-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A combat mechanic is a fact of the game rather than a choice of the simulation.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
