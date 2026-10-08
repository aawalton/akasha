import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushRegistrationSync = {
  id: "01a0655d-dab9-7b64-a9ef-667c2948bf1d",
  type: "page-type/module",
  slug: "push-registration-sync",
  definition: "the device's push token registered as the shell starts",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One call posts a token, whichever sort of push that token takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no sort posts a token taking an alert.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token the server refuses is thrown rather than logged.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A token that never registers leaves a device no push reaches.",
    },
  ],
  createdAt: "2026-09-03T03:44:04.793Z",
  updatedAt: "2026-09-19T19:55:58.000Z",
} as const satisfies Module
