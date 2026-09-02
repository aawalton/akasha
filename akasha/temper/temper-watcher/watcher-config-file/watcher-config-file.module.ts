import type { Module } from "@akasha/code-system/module"

export const watcherConfigFile = {
  id: "01a06381-35cf-7578-8e5c-ded020afdf75",
  pageTypeSlug: "module",
  slug: "watcher-config-file",
  definition: "the lua file the watcher writes back into an addon's folder for the addon to read",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every config file the watcher writes opens with the same header comment.",
    },
    {
      invariantKind: "departure",
      statement: "The header says the file is generated and is not to be edited by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A config file names one global and holds one table under that global.",
    },
    {
      invariantKind: "departure",
      statement: "The version is the first entry of that table.",
    },
    {
      invariantKind: "departure",
      statement: "Every config file carries the same version number.",
    },
    {
      invariantKind: "departure",
      statement: "A block the writer was told nothing for is left out rather than written empty.",
    },
    {
      invariantKind: "departure",
      statement: "A block keyed by numbers comes out ordered by the number rather than by the key.",
    },
    {
      invariantKind: "departure",
      statement: "A block keyed by numbers holding nothing is written on one line.",
    },
    {
      invariantKind: "departure",
      statement: "A block keyed by numbers takes whatever indent the caller states.",
    },
    {
      invariantKind: "departure",
      statement: "A caller stating no indent gets four spaces.",
    },
    {
      invariantKind: "departure",
      statement: "A config file ends with a newline.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out what belongs in a block.",
    },
  ],
} as const satisfies Module
