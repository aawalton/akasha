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
      statement: "A sibling's manifest is carried by the page of the addon that ships the sibling.",
    },
    {
      invariantKind: "departure",
      statement: "A sibling holds a manifest and nothing more.",
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
