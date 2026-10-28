import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderLoginReport = {
  id: "01a1848b-4580-71ab-8f3d-099bc833362d",
  type: "page-type/module",
  slug: "keybinder-login-report",
  definition: "the one chat line saying how many bindings a login set from the keybinding pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The line is posted once a login, after the player is in the world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A login that set nothing says so rather than staying quiet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is of actions rebound on the character, not of pages read.",
    },
  ],
  createdAt: "2026-10-28T22:04:42.239Z",
  updatedAt: "2026-10-28T22:04:42.239Z",
} as const satisfies Module
