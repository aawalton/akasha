import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperCaptureSalesAddon = {
  id: "01a060e2-3181-7c02-be71-c63b5b648d5b",
  pageTypeSlug: "eso-addon",
  slug: "temper-capture-sales-addon",
  definition: "the add-on capturing the player's own guild store sales for a host to read",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "sales-addon-entry",
  partSlugs: ["module/sales-addon-entry", "module/sales-addon-name", "module/sales-capture"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The capture is written to the saved variables the addon manifest names.",
    },
    {
      invariantKind: "departure",
      statement: "The game loads LibHistoire before this add-on.",
    },
    {
      invariantKind: "departure",
      statement: "The shape the capture takes is stated in `temper-capture-sales`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a sale by another seller.",
    },
  ],
} as const satisfies EsoAddon
