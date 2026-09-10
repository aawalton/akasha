import type { Module } from "@akasha/code/module"

export const asking = {
  id: "01a04df0-ecce-7c46-bec3-1461348a7d55",
  pageTypeSlug: "module",
  type: "module",
  slug: "asking",
  definition: "the pieces a command asks for a change with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count of one is said with the singular and every other count with the plural.",
    },
    {
      invariantKind: "gap",
      statement: "The one piece left here belongs under no domain this module names.",
    },
  ],
} as const satisfies Module
