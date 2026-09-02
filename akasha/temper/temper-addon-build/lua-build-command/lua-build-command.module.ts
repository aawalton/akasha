import type { Module } from "@akasha/code-system/module"

export const luaBuildCommand = {
  id: "01a06038-2cc1-7c3a-8b5e-0c9e254e7632",
  pageTypeSlug: "module",
  slug: "lua-build-command",
  definition: "the command line that runs the TypeScript to Lua transpiler over one project",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The transpiler is this repository's own checkout rather than an installed copy.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may name the checkout rather than leave the checkout to be worked out.",
    },
    {
      invariantKind: "departure",
      statement: "Every build loads the same plugins in the same order.",
    },
    {
      invariantKind: "departure",
      statement: "A plugin is named by an absolute path.",
    },
  ],
} as const satisfies Module
