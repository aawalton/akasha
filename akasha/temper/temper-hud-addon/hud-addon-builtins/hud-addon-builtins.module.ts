import type { Module } from "@akasha/code-system/module"

export const hudAddonBuiltins = {
  id: "01a061c5-18dd-7008-b922-a4aeb80eade3",
  pageTypeSlug: "module",
  slug: "hud-addon-builtins",
  definition: "the three fields the HUD add-on puts in the bar without another add-on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The session starts again each time the player is activated for the first time.",
    },
    {
      invariantKind: "departure",
      statement: "A session that was never started is started as the fields are installed.",
    },
  ],
} as const satisfies Module
