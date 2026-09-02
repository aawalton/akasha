import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperLibExtendedJournal = {
  id: "01a0617d-5454-7d6e-a26b-24878ddb747f",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-extended-journal",
  definition: "a window other add-ons hang a tab in, built like the game's own journal",
  manifest: "json",
  addonManifest: "json",
  bindings: "xml",
  bundleEntrySlug: "journal-main",
  partSlugs: [
    "module/journal-shape",
    "module/journal-casts",
    "module/journal-lccc-codec",
    "module/journal-lccc-color",
    "module/journal-lccc-util",
    "module/journal-lccc-util-tables",
    "module/journal-lccc",
    "module/journal-l10n",
    "module/journal-state",
    "module/journal-main-menu",
    "module/journal-window",
    "module/journal-tabs",
    "module/journal-sort-filter-list",
    "module/journal-tooltip-extension",
    "module/journal-core",
    "module/journal-tooltips",
    "module/journal-tooltip-colors",
    "module/journal-public-api",
    "module/journal-main",
    "eso-interface/journal-controls",
    "type-declaration/journal-control-names",
    "type-declaration/journal-string-ids",
    "type-declaration/journal-saved-variables",
  ],
  interfaceSlugs: ["journal-controls"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Another add-on names a tab and hands over the control the tab draws in.",
    },
    {
      invariantKind: "departure",
      statement: "The window is built the first time the window is shown.",
    },
    {
      invariantKind: "departure",
      statement: "A tab is shown by its name from a keybind or a slash command.",
    },
    {
      invariantKind: "departure",
      statement: "The tab shown last answers the settings keybind with its own panel.",
    },
    {
      invariantKind: "departure",
      statement: "The colors a tooltip is drawn in are kept between sessions.",
    },
    {
      invariantKind: "departure",
      statement: "This library carries its own copy of the codes library.",
    },
    {
      invariantKind: "constraint",
      statement: "This library depends on no other add-on.",
    },
  ],
} as const satisfies EsoAddon
