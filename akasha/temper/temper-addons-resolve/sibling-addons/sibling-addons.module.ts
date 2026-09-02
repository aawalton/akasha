import type { Module } from "@akasha/code-system/module"

export const siblingAddons = {
  id: "01a06060-ec40-72c6-b3e3-bb2631d6b18c",
  pageTypeSlug: "module",
  slug: "sibling-addons",
  definition: "the extra addon folders one addon ships alongside its own",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sibling is named in the addon's own manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A sibling's source sits in a `siblings` folder inside the addon.",
    },
    {
      invariantKind: "departure",
      statement: "A sibling name becomes a path that is removed and made again.",
    },
    {
      invariantKind: "departure",
      statement: "A sibling name is checked against a safe folder pattern before becoming a path.",
    },
    {
      invariantKind: "departure",
      statement: "An addon with no readable manifest ships no sibling.",
    },
  ],
} as const satisfies Module
