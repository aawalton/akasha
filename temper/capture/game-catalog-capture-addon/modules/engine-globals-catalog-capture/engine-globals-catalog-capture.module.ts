import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineGlobalsCatalogCapture = {
  id: "01a0ca9b-cea9-76cd-ae0e-b097df1969dc",
  type: "page-type/module",
  slug: "engine-globals-catalog-capture",
  definition: "the collector reading every constant the game's engine declares",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The constants are found by walking the game's globals rather than by naming them.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game's own documentation names a constant without saying what that constant is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global spelled in capitals is taken to be a constant the engine declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global holding anything but a number or a word is passed over.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game saves no word longer than two thousand characters.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One word the game will not save loses everything saved beside that word.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A word is saved with its quotes escaped, so saving takes more room than the word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A word is kept only where that word is far enough under the ceiling to escape safely.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word too long is passed over, and its name and its length are kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number the saved file could not be read back with is passed over by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The constants a later version of the game declares replace the ones before.",
    },
  ],
} as const satisfies Module
