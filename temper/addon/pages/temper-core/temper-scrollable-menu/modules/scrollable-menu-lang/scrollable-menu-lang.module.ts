import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuLang = {
  id: "01a06275-c449-7b5d-9a57-12fbd9707620",
  type: "page-type/module",
  slug: "scrollable-menu-lang",
  definition: "the English strings the library registers with the game string table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Strings are registered at load through ZO_CreateStringId.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Translations for other client languages are not present.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Each string is versioned through SafeAddVersion at version 1.",
    },
  ],
} as const satisfies Module
