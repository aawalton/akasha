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
      statement: "The game gives an add-on a function of its own for stepping through a table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The globals are stepped through with that function where the game gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lua's own stepping function is used where the game gives no function of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which of the two listed the globals is saved beside what the listing found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing the game refuses is a skip with a reason rather than an empty catalog.",
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
      statement: "The game refuses some words, and says only that the word was invalid.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One word the game refuses loses every constant saved beside that word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words the globals hold are saved apart from every other constant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word the game refuses therefore loses the words alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global holding a word is kept by name as well, so the name outlives the word.",
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
