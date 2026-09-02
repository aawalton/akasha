import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperErrorsAddon = {
  id: "01a060d8-091b-75bc-9d03-8347c2e81d2f",
  pageTypeSlug: "eso-addon",
  slug: "temper-errors-addon",
  definition: "the add-on that records every Lua error the game raises into saved variables",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "errors-addon-entry",
  partSlugs: [
    "module/errors-addon-limits",
    "module/errors-addon-traceback",
    "module/errors-addon-build-ids",
    "module/errors-addon-record",
    "module/errors-addon-hooks",
    "module/errors-addon-entry",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An error raised before the add-on loads is recorded once loading finishes.",
    },
    {
      invariantKind: "departure",
      statement: "Two errors sharing one callstack are kept as one entry under a count.",
    },
    {
      invariantKind: "departure",
      statement: "An error is blamed on the add-on folder its callstack names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the recorded errors back.",
    },
  ],
} as const satisfies EsoAddon
