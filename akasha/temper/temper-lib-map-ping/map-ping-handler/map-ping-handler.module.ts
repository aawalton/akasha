import type { Module } from "@akasha/code-system/module"

export const mapPingHandler = {
  id: "01a0605f-6262-7752-a1ba-21ba45c69531",
  pageTypeSlug: "module",
  slug: "map-ping-handler",
  definition: "the wrappers around the game's own map ping functions",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A wrapper calls the function the wrapper replaced.",
    },
    {
      invariantKind: "departure",
      statement: "The game's own map is unhooked from the ping event.",
    },
    {
      invariantKind: "departure",
      statement: "A suppressed ping reads back as no position.",
    },
    {
      invariantKind: "departure",
      statement: "A group ping outside a group is dropped.",
    },
  ],
} as const satisfies Module
