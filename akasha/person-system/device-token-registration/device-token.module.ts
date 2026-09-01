import type { Module } from "@akasha/code-system/module"

export const deviceToken = {
  id: "01a05c96-89f5-741d-a9a3-65ffde3552f4",
  pageTypeSlug: "module",
  slug: "device-token",
  definition: "the push token a device is reached at, kept against whoever holds it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token is kept under itself.",
    },
    {
      invariantKind: "departure",
      statement: "Registering a token again replaces what stood under it.",
    },
    {
      invariantKind: "departure",
      statement: "The moment a token was last seen is written on every registration.",
    },
    {
      invariantKind: "departure",
      statement: "A registration that does not land raises rather than passing.",
    },
  ],
} as const satisfies Module
