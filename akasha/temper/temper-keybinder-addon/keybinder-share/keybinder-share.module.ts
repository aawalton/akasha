import type { Module } from "@akasha/code-system/module"

export const keybinderShare = {
  id: "01a06381-67c1-7b12-b16d-aa11abf8a0bf",
  pageTypeSlug: "module",
  slug: "keybinder-share",
  definition:
    "carrying an account-wide binding onto the character, and taking a character's binding account-wide",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Synchronising is deferred to the next frame rather than done in place.",
    },
    {
      invariantKind: "departure",
      statement: "An action is rebound only where its keys differ from the saved ones.",
    },
    {
      invariantKind: "departure",
      statement: "The toggle clears the shown actions where every one of them is already shared.",
    },
    {
      invariantKind: "departure",
      statement: "A hidden action is passed over.",
    },
  ],
} as const satisfies Module
