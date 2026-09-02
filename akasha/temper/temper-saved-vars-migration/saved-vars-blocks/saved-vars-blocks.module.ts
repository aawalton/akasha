import type { Module } from "@akasha/code-system/module"

export const savedVarsBlocks = {
  id: "01a06072-5abc-7ca4-972f-214d6d6ef964",
  pageTypeSlug: "module",
  slug: "saved-vars-blocks",
  definition: "one global's assignment lifted whole out of a saved variables file",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A global's block opens on the line assigning that global.",
    },
    {
      invariantKind: "departure",
      statement: "A global's block closes where a line begins with a closing brace.",
    },
    {
      invariantKind: "departure",
      statement: "A global's block closes early where another global's assignment opens.",
    },
    {
      invariantKind: "departure",
      statement: "A global the file does not assign has no block.",
    },
    {
      invariantKind: "departure",
      statement: "A block already present in the target is appended no second time.",
    },
    {
      invariantKind: "departure",
      statement: "The line ending the target already uses is the line ending appended with.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here parses Lua.",
    },
  ],
} as const satisfies Module
