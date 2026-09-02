import type { EsoAddon } from "../../code-system/eso-addon/eso-addon.page-type.ts"

export const temperHousingAddon = {
  id: "01a06113-b7cb-7519-aaf3-198045bc75aa",
  pageTypeSlug: "eso-addon",
  slug: "temper-housing-addon",
  definition: "the add-on for travelling to a house, whether a friend's, your own or a shared one",
  manifest: "json",
  addonManifest: "json",
  bindings: "xml",
  partSlugs: [
    "module/housing-addon-names",
    "module/housing-build-casts",
    "module/housing-constants",
    "module/housing-declarations",
    "module/housing-holder-types",
    "module/housing-house-names",
    "module/housing-library-data-eu",
    "module/housing-library-data-eu-1",
    "module/housing-library-data-eu-2",
    "module/housing-library-data-eu-3",
    "module/housing-library-data-eu-4",
    "module/housing-library-data-eu-5",
    "module/housing-library-data-eu-6",
    "module/housing-library-data-na",
    "module/housing-menu-state",
    "module/housing-publish",
    "module/housing-state",
    "module/housing-state-types",
    "module/housing-types",
    "module/housing-visit-cards-view",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A port to another player's house asks the game rather than moving the player.",
    },
    {
      invariantKind: "departure",
      statement: "A visit card travels as an ordinary chat line carrying an agreed key word.",
    },
    {
      invariantKind: "departure",
      statement: "The community library of shared houses is carried with the add-on.",
    },
    {
      invariantKind: "departure",
      statement: "Every keybind reaches the add-on through one published global holder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks a server outside the game.",
    },
    {
      invariantKind: "gap",
      statement: "The upstream arm asking a player to donate to the author was left behind.",
    },
  ],
} as const satisfies EsoAddon
