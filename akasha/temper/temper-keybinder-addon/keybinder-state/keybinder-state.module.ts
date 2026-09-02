import type { Module } from "@akasha/code-system/module"

export const keybinderState = {
  id: "01a06381-67c1-7d0e-a12d-5abeb99a1a60",
  pageTypeSlug: "module",
  slug: "keybinder-state",
  definition: "what the add-on holds while the key-bind window is open",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The saved variables replace the account bindings once the game loads the saved variables.",
    },
    {
      invariantKind: "departure",
      statement: "Leaving the key-bind window forgets that the bindings were synchronised.",
    },
  ],
} as const satisfies Module
