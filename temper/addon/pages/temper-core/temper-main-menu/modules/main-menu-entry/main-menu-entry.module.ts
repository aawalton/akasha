import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mainMenuEntry = {
  id: "01a0605b-c802-71af-a8cf-d954d41e3520",
  type: "page-type/module",
  slug: "main-menu-entry",
  definition: "the module a bundle of this addon is gathered from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A module no import chain from here reaches is left out of the bundle.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing is declared here.",
    },
  ],
} as const satisfies Module
