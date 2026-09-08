import type { Module } from "@akasha/code/module"

export const terminalBash = {
  id: "01a0680a-fa30-73ea-803a-5ff0bd947f73",
  pageTypeSlug: "module",
  slug: "terminal-bash",
  definition: "the whole of the bash a terminal sources, composed as one text",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The text is composed whole rather than patched onto the bash a terminal already has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name that was once an alias is unaliased before that name is defined as a function.",
    },
    {
      invariantKind: "departure",
      statement: "An account gets one launcher named for the alias index that account has.",
    },
    {
      invariantKind: "departure",
      statement: "The launchers are in the order of the alias indexes rather than of the slugs.",
    },
    {
      invariantKind: "departure",
      statement: "Every launcher reloads the whole set before that launcher dispatches.",
    },
    {
      invariantKind: "departure",
      statement: "A comment above a block states the block's purpose.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or the disk.",
    },
  ],
} as const satisfies Module
