import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonJson = {
  id: "01a06060-ec3d-70b4-aba1-0e67a09d8d91",
  type: "page-type/module",
  slug: "addon-json",
  definition: "the shape of the `addon.json` an addon in this repository holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon states the name the game loads that addon under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon states the version of that addon as a number the game compares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon states the saved variables the game keeps for that addon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon states the addons the game loads before that addon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key nothing here names is carried through rather than dropped.",
    },
  ],
} as const satisfies Module
