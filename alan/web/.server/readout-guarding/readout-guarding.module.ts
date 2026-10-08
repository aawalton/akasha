import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutGuarding = {
  id: "01a0655e-d39a-743e-a192-9fef67057d38",
  type: "page-type/module",
  slug: "readout-guarding",
  definition: "a readout request refused unless the reader is known and holds readout access",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout feed admits a device secret or a signed-in contributor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request carrying no device secret header is read as a session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request carrying a device secret is read by that secret and by nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader admitted either way must hold readout access.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The widget carries a device secret and the app's web view carries a session.",
    },
  ],
  code: "ts",
  createdAt: "2026-09-03T03:45:08.506Z",
  updatedAt: "2026-09-20T23:44:02.000Z",
} as const satisfies Module
