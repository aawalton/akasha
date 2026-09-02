import type { Module } from "@akasha/code-system/module"

export const keybinderCasts = {
  id: "01a06381-67c1-74e3-a405-6c6a7d592238",
  pageTypeSlug: "module",
  slug: "keybinder-casts",
  definition: "every cast this add-on makes, gathered where they can be counted",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cast is written here rather than where the value is used.",
    },
  ],
} as const satisfies Module
