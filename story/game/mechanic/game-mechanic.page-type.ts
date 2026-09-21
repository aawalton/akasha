import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gameMechanic = {
  id: "01a0c454-ce61-7e73-8b14-29b03bd0d245",
  type: "page-type/page-type",
  slug: "game-mechanic",
  definition: "a rule of play reached by name, whose code settles what that rule does",
  extends: ["page-type/module"],
  parts: [
    "module/mechanic-running",
    "module/linear-stat",
    "game-mechanic/phys-atk",
    "game-mechanic/focus-max",
    "game-mechanic/hp-max",
    "game-mechanic/initiative",
    "game-mechanic/ment-def",
    "game-mechanic/phys-def",
    "game-mechanic/stam-max",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanic is reached by the address that mechanic is filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanic's code is handed what that mechanic reads and answers what changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanic handed the same values answers the same.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing a mechanic's code reaches lies outside the values handed in.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  loadedExport: ["runMechanic"],
} as const satisfies PageType
