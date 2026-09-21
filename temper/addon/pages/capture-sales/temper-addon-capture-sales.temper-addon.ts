import type { TemperAddon } from "akasha/temper/addon/temper-addon.page-type.types.ts"

export const temperAddonCaptureSales = {
  id: "01a060e2-3181-7c02-be71-c63b5b648d5b",
  type: "page-type/temper-addon",
  slug: "temper-addon-capture-sales",
  definition: "the add-on capturing the player's own guild store sales for a host to read",

  addonManifest: "json",
  bundleEntry: "module/sales-addon-entry",
  parts: ["module/sales-addon-entry", "module/sales-addon-name", "module/sales-capture"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The capture is written to the saved variables the addon manifest names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game loads LibHistoire before this add-on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shape the capture takes is stated in `temper-capture-sales`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a sale by another seller.",
    },
  ],
} as const satisfies TemperAddon
