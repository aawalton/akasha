import type { Module } from "@akasha/code-system/module"

export const keybinderPublicApi = {
  id: "01a06381-67c1-75f6-ba15-5366cbc95058",
  pageTypeSlug: "module",
  slug: "keybinder-public-api",
  definition: "the global the key binding in the markup calls the toggle through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The global is named for the addon.",
    },
    {
      invariantKind: "departure",
      statement: "The global carries the one toggle and nothing more.",
    },
  ],
} as const satisfies Module
