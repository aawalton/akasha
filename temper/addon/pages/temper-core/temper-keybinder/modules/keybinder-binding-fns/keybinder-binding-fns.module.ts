import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderBindingFns = {
  id: "01a06381-67c1-70be-89d4-23608f21260c",
  type: "page-type/module",
  slug: "keybinder-binding-fns",
  definition: "binding and unbinding a key, through the secure call where the game protects it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A protected call is made through the secure wrapper rather than directly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call the game keeps private is not made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The add-on does nothing where neither way of binding is open to the add-on.",
    },
  ],
  createdAt: "2026-09-02T19:03:40.225Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
