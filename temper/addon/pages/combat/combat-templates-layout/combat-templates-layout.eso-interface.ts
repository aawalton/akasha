import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const combatTemplatesLayout = {
  id: "01a0617f-5852-72f4-9d5e-4c118e7492c2",
  type: "page-type/eso-interface",
  slug: "combat-templates-layout",
  definition: "every reusable control building the report windows",
  markup: "xml",
  loadedAs: "TemperCombat_Templates.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A framed panel in the report takes the game's inset art.",
    },
  ],
  createdAt: "2026-09-02T09:42:10.770Z",
  updatedAt: "2026-10-18T19:43:25.819Z",
} as const satisfies EsoInterface
