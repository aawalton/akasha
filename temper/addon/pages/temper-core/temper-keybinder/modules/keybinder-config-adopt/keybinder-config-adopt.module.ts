import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderConfigAdopt = {
  id: "01a18487-471b-7dc6-a43a-92c3cfba27ff",
  type: "page-type/module",
  slug: "keybinder-config-adopt",
  definition: "the keybindings the watcher left in TemperConfig, taken onto the shared bindings",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The add-on reads the keybindings from the config file rather than its saved variables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A config stating no version above zero states no keybindings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action the game captured a later change for keeps the game's keys.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action the config states unshared is taken out of the shared bindings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action is compared slot by slot, a missing slot holding no key.",
    },
  ],
  createdAt: "2026-10-28T22:00:20.506Z",
  updatedAt: "2026-10-28T22:00:20.506Z",
} as const satisfies Module
