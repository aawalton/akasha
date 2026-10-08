import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mainMenuEntry = {
  id: "01a0605b-c802-71af-a8cf-d954d41e3520",
  type: "page-type/module",
  slug: "main-menu-entry",
  definition: "the module gathering a bundle of this addon",
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
  createdAt: "2026-09-02T04:23:42.850Z",
  updatedAt: "2026-09-22T13:54:21.000Z",
} as const satisfies Module
