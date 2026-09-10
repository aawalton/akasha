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
      statement: "Reaching a body tells a path nothing is at from a path that will not open.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not open is answered with why that body would not.",
    },
    {
      invariantKind: "departure",
      statement:
        "The command putting a subagent's page up is filled in from the agent id as far as that id says.",
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
