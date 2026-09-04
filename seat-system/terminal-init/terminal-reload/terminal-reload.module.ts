import type { Module } from "@akasha/code-system/module"

export const terminalReload = {
  id: "01a0680a-fa30-773e-a23e-fcd5bda782a7",
  pageTypeSlug: "module",
  slug: "terminal-reload",
  definition: "the bounded reload a launcher runs over itself before it dispatches",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A launcher is a name calling the reload and then the definition the reload left.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a launcher does stands under a name of its own rather than under the name typed.",
    },
    {
      invariantKind: "departure",
      statement: "The reload composes the whole set again rather than the one launcher that ran.",
    },
    {
      invariantKind: "departure",
      statement: "The set is parsed before it is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A set that will not parse leaves the definitions the terminal started with.",
    },
    {
      invariantKind: "departure",
      statement: "A reload that could not be done says which step of it failed.",
    },
    {
      invariantKind: "departure",
      statement: "A launcher runs on the stale definition rather than not running.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what any one launcher does.",
    },
  ],
} as const satisfies Module
