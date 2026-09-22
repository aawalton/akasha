import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipSettingsLam = {
  id: "01a0623c-2df6-7308-a66d-91a7225dd61b",
  type: "page-type/module",
  slug: "sets-tip-settings-lam",
  definition: "the settings panel rows for the tooltip options",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing is built here on console or in gamepad mode.",
    },
    { decisionKind: "decision-kind/constraint", statement: "The panel is built at most once." },
    {
      decisionKind: "decision-kind/departure",
      statement: "Turning a custom pattern on greys out every stock tooltip row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The traits needed setting shares its row with the reconstruction cost setting.",
    },
  ],
} as const satisfies Module
