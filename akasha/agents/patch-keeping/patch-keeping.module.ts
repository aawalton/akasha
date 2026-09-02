import type { Module } from "@akasha/code-system/module"

export const patchKeeping = {
  id: "01a062f5-e62d-72fc-81d4-e2391e39ae87",
  pageTypeSlug: "module",
  slug: "patch-keeping",
  definition: "the patch an agent is drafting, kept in a file beside the agent's page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A patch is kept in a file beside the page of the agent drafting the patch.",
    },
    {
      invariantKind: "departure",
      statement: "The path index and this module name the file by one rule.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is no page keeps no patch.",
    },
    {
      invariantKind: "departure",
      statement:
        "An agent drafting nothing is answered with nothing rather than with an empty patch.",
    },
    {
      invariantKind: "departure",
      statement: "The folder holding the page is made before the turn over the patch is taken.",
    },
    {
      invariantKind: "departure",
      statement: "A patch is read and written again under one turn over the file.",
    },
    {
      invariantKind: "departure",
      statement: "A reader outside that turn never sees a patch half written.",
    },
    {
      invariantKind: "departure",
      statement: "A patch worked out to nothing is taken away rather than left empty.",
    },
  ],
} as const satisfies Module
