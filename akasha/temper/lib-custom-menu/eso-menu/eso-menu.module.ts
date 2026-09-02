import type { Module } from "@akasha/code-system/module"

export const esoMenu = {
  id: "01a0605a-581e-7142-806e-c83e2c7a8fe8",
  pageTypeSlug: "module",
  slug: "eso-menu",
  definition: "the game's own context menu control",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One control carries every context menu the game shows.",
    },
  ],
} as const satisfies Module
