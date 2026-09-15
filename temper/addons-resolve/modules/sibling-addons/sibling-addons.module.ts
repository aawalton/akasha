import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const siblingAddons = {
  id: "01a06060-ec40-72c6-b3e3-bb2631d6b18c",
  type: "module",
  slug: "sibling-addons",
  definition: "the extra addon folders one addon ships alongside its own",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sibling is named in the addon's own manifest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sibling's manifest is carried by the page of the addon that ships the sibling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sibling has a manifest and nothing more.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sibling name becomes a path that is removed and made again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sibling name is checked against a safe folder pattern before becoming a path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The safe folder pattern is answered on its own, for a caller naming no sibling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon with no readable manifest ships no sibling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sibling manifest a page does not carry ships no sibling.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No file name ending is spelled here.",
    },
  ],
} as const satisfies Module
