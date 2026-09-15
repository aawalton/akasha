import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const importRedirect = {
  id: "01a09097-3491-7938-9cab-3a376e69de9f",
  type: "module",
  slug: "import-redirect",
  definition: "where a browser is sent after a shared build hash was imported for that browser",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A redirect carries every cookie the import set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A redirect is found again rather than moved for good.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A redirect has no body.",
    },
  ],
} as const satisfies Module
