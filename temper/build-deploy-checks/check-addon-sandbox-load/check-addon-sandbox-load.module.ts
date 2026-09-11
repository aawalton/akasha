import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const checkAddonSandboxLoad = {
  id: "01a06365-e827-7009-9a16-7217fe717a36",
  type: "module",
  slug: "check-addon-sandbox-load",
  definition:
    "the run judging whether an emitted bundle loads under a sandbox shaped like the game's",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The population the run states is the emitted bundles under the build output.",
    },

    {
      invariantKind: "constraint",
      statement: "An empty base-game string-id census ends the run rather than passing the run.",
    },
    {
      invariantKind: "constraint",
      statement: "Every bundle gets a sandbox of the bundle's own.",
    },
    {
      invariantKind: "constraint",
      statement: "A failing run names the build command and the call that runs one bundle alone.",
    },
    {
      invariantKind: "departure",
      statement: "That call is the file running rather than a path spelled here.",
    },
  ],
} as const satisfies Module
