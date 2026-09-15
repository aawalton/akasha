import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonManifestFile = {
  id: "01a060e2-4d62-7a26-8c08-d2b7be0f14ff",
  type: "module",
  slug: "addon-manifest-file",
  definition: "where in an addon's own folder the file the addon states itself in is found",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon folder outside akasha states itself in a file named `addon.json`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An akasha package states itself in the manifest file beside its own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder with both spellings answers with `addon.json`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder with neither spelling answers that no addon is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder with two manifests beside pages is thrown on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page a folder holds is asked of the index rather than read off the folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page's file is that page's name, a property's slug and the form the page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A folder outside the checkout holds no page, so the game's spelling alone answers.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No file name ending is spelled here.",
    },
  ],
} as const satisfies Module
