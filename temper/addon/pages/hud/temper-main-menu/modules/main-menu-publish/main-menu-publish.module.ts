import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mainMenuPublish = {
  id: "01a0605b-c804-7741-baf4-fd76e49cbba7",
  type: "page-type/module",
  slug: "main-menu-publish",
  definition: "the library object handed to the game under one global name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A second copy of the library loading later leaves the first copy in place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A console client is handed nothing.",
    },
  ],
} as const satisfies Module
