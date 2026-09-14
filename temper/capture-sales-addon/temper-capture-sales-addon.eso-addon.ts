import type { EsoAddon } from "akasha/code/eso-addons/eso-addon.page-type.types.ts"

export const temperCaptureSalesAddon = {
  id: "01a060e2-3181-7c02-be71-c63b5b648d5b",
  type: "eso-addon",
  slug: "temper-capture-sales-addon",
  definition: "the add-on capturing the player's own guild store sales for a host to read",

  addonManifest: "json",
  bundleEntry: "module/sales-addon-entry",
  parts: ["module/sales-addon-entry", "module/sales-addon-name", "module/sales-capture"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The capture is written to the saved variables the addon manifest names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The game loads LibHistoire before this add-on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The shape the capture takes is stated in `temper-capture-sales`.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a sale by another seller.",
    },
  ],
} as const satisfies EsoAddon
