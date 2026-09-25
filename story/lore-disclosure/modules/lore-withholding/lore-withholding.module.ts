import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreWithholding = {
  id: "01a0d486-426b-7e79-bb02-c10a0233e201",
  type: "page-type/module",
  slug: "lore-withholding",
  definition: "the lore a game master's seat is kept from reading, and whether a path reaches it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game master's seat is one the game master role's references name by role.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent is judged by the seat above that subagent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The lore withheld is every page the world builder disclosure's references name by disclosure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page moved down from world-builder disclosure is let through from then on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other caller is answered with nothing withheld.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path is withheld where the path, links followed, ends in a withheld page's path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copy of a withheld page in any tree is withheld as the page is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding a withheld page, or a copy of one, reaches that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names nothing from inside a withheld page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal says to ask the world builder rather than to read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A read refused whole for a withheld page is worded here, so every reader refuses it alike.",
    },
  ],
} as const satisfies Module
