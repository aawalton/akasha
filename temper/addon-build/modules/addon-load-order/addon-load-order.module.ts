import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonLoadOrder = {
  id: "01a062d1-4a70-7b3c-9e21-6d0a51f4c7e8",
  type: "module",
  slug: "addon-load-order",
  definition: "the manifest the game reads to decide what an addon loads and in what order",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The manifest is written from the values the addon's own manifest declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The Lua the manifest names is the bundle the compiler settings declare.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An addon folder with no compiler settings has settings written before the bundle is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The catalog addon alone takes its api version from the catalog domain pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That version is the lowest any domain being collected last ran a generator for.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A catalog domain left alone counts toward no version.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A domain being collected that states no version refuses the call.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The catalog version is as current as the last rebuild of the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dependency floor of zero is written as the bare addon name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The build stamp is the first eight hex of the commit the addon folder is at.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "An addon name that is no bare folder name refuses the call before Lua is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stamp the environment names holds over the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Markup is listed only where the addon holds that markup.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the manifest lists is listed once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Keybinds are listed wherever the addon's page carries a keybinds file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where a file the manifest lists sits is settled by one rule, held elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each file written here is named to the caller as soon as that file is written.",
    },
  ],
} as const satisfies Module
