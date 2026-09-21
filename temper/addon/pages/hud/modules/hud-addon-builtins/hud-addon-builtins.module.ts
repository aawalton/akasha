import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonBuiltins = {
  id: "01a061c5-18dd-7008-b922-a4aeb80eade3",
  type: "page-type/module",
  slug: "hud-addon-builtins",
  definition: "the three fields the HUD add-on puts in the bar without another add-on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The session starts again each time the player is activated for the first time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session that was never started is started as the fields are installed.",
    },
  ],
} as const satisfies Module
