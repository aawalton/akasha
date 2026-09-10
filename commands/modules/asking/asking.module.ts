import type { Module } from "@akasha/code/module"

export const asking = {
  id: "01a04df0-ecce-7c46-bec3-1461348a7d55",
  pageTypeSlug: "module",
  type: "module",
  slug: "asking",
  definition: "the pieces a command asks for a change with",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count of one is said with the singular and every other count with the plural.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands a change, as every road that lands reaches a change page.",
    },
    {
      invariantKind: "gap",
      statement: "These pieces answer to more than one concern, so this is more than one module.",
    },
  ],
} as const satisfies Module
