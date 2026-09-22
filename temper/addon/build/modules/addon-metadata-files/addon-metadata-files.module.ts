import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMetadataFiles = {
  id: "01a061a6-a945-7667-867d-9548c3e63be1",
  type: "page-type/module",
  slug: "addon-metadata-files",
  definition: "where an addon's keybinds and named files are, whichever shape its folder takes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The keybinds file is named by the page property with the keybinds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An akasha addon has its keybinds beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game addon has its keybinds under a metadata folder.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An addon page claiming keybinds with no such file refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the manifest names is looked for beside the page first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest name reaching nothing beside the page is looked for under metadata.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest name reaching no file there reaches the page loaded by that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page loaded by a name sits anywhere under the addon's folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Markup and Lua are reached by one rule.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Two pages loaded by one name refuse the call.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A manifest name no page is loaded by refuses the call.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A page loaded by a name whose own file is absent refuses the call.",
    },
  ],
} as const satisfies Module
