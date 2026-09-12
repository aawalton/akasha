import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const draftKeeping = {
  id: "01a094e0-4979-7d5e-af22-aa331354d3bf",
  type: "module",
  slug: "draft-keeping",
  definition: "a change kept as an agent's edits rather than written onto the tree",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A draft is held to the bodies its writer read as a landing is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A draft refused over a body that moved names the call taking the kept edits away.",
    },
    {
      invariantKind: "departure",
      statement: "One rule answers whether a landing and a draft are held to the bodies read.",
    },
    {
      invariantKind: "departure",
      statement: "A draft answers which paths the change it kept names.",
    },
    {
      invariantKind: "departure",
      statement: "A draft takes no hold over the worktree.",
    },
    {
      invariantKind: "absence",
      statement: "A draft writes no body the change carries into the worktree.",
    },
    {
      invariantKind: "absence",
      statement: "A draft commits nothing.",
    },
    {
      invariantKind: "absence",
      statement: "No check runs over a draft.",
    },
    {
      invariantKind: "absence",
      statement: "A draft is weighed against no importers.",
    },
  ],
} as const satisfies Module
