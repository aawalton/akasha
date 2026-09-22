import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonVisibilityVersion = {
  id: "01a061c5-18dd-7002-98bb-12e2b151ea28",
  type: "page-type/module",
  slug: "hud-addon-visibility-version",
  definition:
    "which version the stored HUD visibility is at and how an older version is brought forward",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The baseline stored the flag each part was hidden by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The current version stores the flag each part is shown by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stored value that is not a boolean is left out of the migration.",
    },
  ],
} as const satisfies Module
