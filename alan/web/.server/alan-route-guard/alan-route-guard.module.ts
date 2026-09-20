import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alanRouteGuard = {
  id: "01a0c129-30bb-7f20-8811-37cb885fa99e",
  type: "page-type/module",
  slug: "alan-route-guard",
  definition: "which routes of alanwalton.com a reader reaches, and where the rest send them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Google session decides what a reader reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route this guard is told is open is reached by anybody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader sent to the sign-in route carries where they were asking for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No cookie is written back, so a reader's session is left as it was.",
    },
  ],
} as const satisfies Module
