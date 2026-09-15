import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const luaBuildCommand = {
  id: "01a06038-2cc1-7c3a-8b5e-0c9e254e7632",
  type: "module",
  slug: "lua-build-command",
  definition: "the command line that runs the TypeScript to Lua transpiler over one project",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The transpiler is this repository's own checkout rather than an installed copy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may name the checkout rather than leave the checkout to be worked out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every build loads the same plugins in the same order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A plugin is named by an absolute path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where the compiler's program and each plugin sit is asked of the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The compiler's program and each plugin are found by the id each page carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where the compiler's own folder sits is asked of the index as well.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The checkout a caller names is joined to a place under the compiler's own folder.",
    },
  ],
} as const satisfies Module
