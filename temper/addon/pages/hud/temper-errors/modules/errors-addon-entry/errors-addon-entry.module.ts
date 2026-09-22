import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorsAddonEntry = {
  id: "01a060d8-091a-7ce1-8550-de2e11a20429",
  type: "page-type/module",
  slug: "errors-addon-entry",
  definition: "what error capture does as the game loads the add-on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Listening begins before saved variables are ready.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Saved variables are opened through the capture writer.",
    },
  ],
} as const satisfies Module
