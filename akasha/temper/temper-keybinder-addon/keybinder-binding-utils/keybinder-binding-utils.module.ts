import type { Module } from "@akasha/code-system/module"

export const keybinderBindingUtils = {
  id: "01a06381-67c1-7246-ad70-5a367ff2cd98",
  pageTypeSlug: "module",
  slug: "keybinder-binding-utils",
  definition: "reading an action's keys out of the game and comparing them with a saved set",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A modifier is reduced to the one key that represents that modifier before comparison.",
    },
    {
      invariantKind: "departure",
      statement: "An action is bound when any one of its binding slots holds a key.",
    },
  ],
} as const satisfies Module
