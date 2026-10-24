import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const authFooter = {
  id: "01a08e43-fb7d-780f-b702-af0566841b73",
  type: "page-type/module",
  slug: "auth-footer",
  definition: "the sidebar footer a person signs in or out from, or reaches settings from",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Signing out is a form POST rather than a call the browser makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collapsed sidebar shows the icon alone.",
    },
  ],
  createdAt: "2026-09-11T02:20:15.101Z",
  updatedAt: "2026-10-24T19:58:32.489Z",
} as const satisfies Module
