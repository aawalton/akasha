import type { Module } from "@akasha/code-system/module"

export const addonMetadataFiles = {
  id: "01a061a6-a945-7667-867d-9548c3e63be1",
  pageTypeSlug: "module",
  slug: "addon-metadata-files",
  definition: "where an addon's keybinds and extra Lua are, whichever shape its folder takes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The keybinds file is named by the page property holding the keybinds.",
    },
    {
      invariantKind: "departure",
      statement: "An akasha addon holds its keybinds beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A game addon holds its keybinds under a metadata folder.",
    },
    {
      invariantKind: "constraint",
      statement: "An addon page claiming keybinds with no such file refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "An extra Lua file the manifest names is looked for beside the page first.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest name with no file beside the page reaches the Lua module the page names.",
    },
    {
      invariantKind: "gap",
      statement: "A pairing of manifest names to Lua modules that is not forced refuses the call.",
    },
  ],
} as const satisfies Module
