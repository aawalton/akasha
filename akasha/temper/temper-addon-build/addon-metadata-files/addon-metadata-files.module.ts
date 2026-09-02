import type { Module } from "@akasha/code-system/module"

export const addonMetadataFiles = {
  id: "01a061a6-a945-7667-867d-9548c3e63be1",
  pageTypeSlug: "module",
  slug: "addon-metadata-files",
  definition: "where an addon's keybinds and named files are, whichever shape its folder takes",
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
      statement: "A file the manifest names is looked for beside the page first.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest name reaching nothing beside the page is looked for under metadata.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest name reaching no file there reaches the page loaded by that name.",
    },
    {
      invariantKind: "departure",
      statement: "Markup and Lua are reached by one rule rather than by a rule each.",
    },
    {
      invariantKind: "constraint",
      statement: "Two pages loaded by one name refuse the call.",
    },
    {
      invariantKind: "constraint",
      statement: "A manifest name no page is loaded by refuses the call.",
    },
    {
      invariantKind: "constraint",
      statement: "A page loaded by a name whose own file is absent refuses the call.",
    },
  ],
} as const satisfies Module
