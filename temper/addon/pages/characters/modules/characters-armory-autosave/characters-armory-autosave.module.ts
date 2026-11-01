import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersArmoryAutosave = {
  id: "01a19940-3526-71c8-9e5f-4d606793c705",
  type: "page-type/module",
  slug: "characters-armory-autosave",
  definition: "saving the active build in the Temper Armory as the character changes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The active build saves itself only once the character has held every part it saves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build being equipped saves nothing until the character holds all of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change saves once it has lasted two checks, so a loading screen saves nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing saves while the character is in combat or dead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A save the character still does not match stops saving until it matches again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A curse counts toward a match by being there or not, whatever its name.",
    },
  ],
  createdAt: "2026-11-01T22:34:44.390Z",
  updatedAt: "2026-11-01T22:34:44.390Z",
} as const satisfies Module
