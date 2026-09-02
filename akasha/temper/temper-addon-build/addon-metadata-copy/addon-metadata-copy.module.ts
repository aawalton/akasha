import type { Module } from "@akasha/code-system/module"

export const addonMetadataCopy = {
  id: "01a062d1-4a71-7f08-a4d5-3b9e7c02a1df",
  pageTypeSlug: "module",
  slug: "addon-metadata-copy",
  definition: "everything an addon ships that is not its Lua, put into the addon's build output",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The load order is written before anything is copied.",
    },
    {
      invariantKind: "departure",
      statement: "An addon whose named markup is absent gets an empty document written.",
    },
    {
      invariantKind: "departure",
      statement: "An addon that binds no keys gets an empty bindings document written.",
    },
    {
      invariantKind: "departure",
      statement: "The game reads a named document rather than an optional one.",
    },
    {
      invariantKind: "departure",
      statement: "Every directory under the addon's metadata folder is copied whole.",
    },
    {
      invariantKind: "absence",
      statement: "A name the game fills in while running is copied by nothing here.",
    },
    {
      invariantKind: "constraint",
      statement: "A declared file the addon folder does not hold refuses the call.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A declared sibling addon that is neither a folder nor a manifest refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A sibling folder is given the marker naming the build that wrote the sibling.",
    },
  ],
} as const satisfies Module
