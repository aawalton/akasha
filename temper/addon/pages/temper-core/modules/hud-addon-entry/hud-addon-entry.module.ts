import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonEntry = {
  id: "01a061c5-18dd-7010-a74b-7e1a0ac8f751",
  type: "page-type/module",
  slug: "hud-addon-entry",
  definition: "what the HUD add-on does once the game has loaded that add-on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The saved variables are opened before anything reads the saved variables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The global is published before the game finishes loading the add-on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Temper's named fonts are declared as this Lua loads, before any layout names them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The session is started again on the first player activation of a login.",
    },
  ],
} as const satisfies Module
