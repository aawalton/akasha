import type { Module } from "@akasha/code-system/module"

export const companionQolBindings = {
  id: "01a0611d-84c3-76da-bd79-5f0adf6ca49f",
  pageTypeSlug: "module",
  slug: "companion-qol-bindings",
  definition: "the keybind names the quality-of-life code adds to the game",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A keybind name is added as a game string rather than declared in the manifest.",
    },
  ],
} as const satisfies Module
