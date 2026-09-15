import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMetadataFiles = {
  id: "01a061a6-a945-7667-867d-9548c3e63be1",
  type: "module",
  slug: "addon-metadata-files",
  definition: "where an addon's keybinds and named files are, whichever shape its folder takes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keybinds file is named by the page property with the keybinds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An akasha addon has its keybinds beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A game addon has its keybinds under a metadata folder.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An addon page claiming keybinds with no such file refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the manifest names is looked for beside the page first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest name reaching nothing beside the page is looked for under metadata.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest name reaching no file there reaches the page loaded by that name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Markup and Lua are reached by one rule.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Two pages loaded by one name refuse the call.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A manifest name no page is loaded by refuses the call.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A page loaded by a name whose own file is absent refuses the call.",
    },
  ],
} as const satisfies Module
