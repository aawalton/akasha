import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gearTypeNames = {
  id: "01a0e0f1-c52f-79b5-8396-13fc14696f93",
  type: "page-type/module",
  slug: "gear-type-names",
  definition: "the names of the numbers the game gives equip, weapon and armor types",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An equip type is named by the armor slot, weapon slot or jewelry type stating it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon type is named by the weapon type or armor weight stating it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An armor type is named by the armor weight stating it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is the title of the page stating the number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two pages stating one number throw rather than naming it by either.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are held with the skill catalogue, and read before then they throw.",
    },
  ],
} as const satisfies Module
