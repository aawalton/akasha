import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudComponentLabels = {
  id: "01a060a4-fa3a-7e69-ab6f-7e0aaefa14c1",
  type: "page-type/module",
  slug: "hud-component-labels",
  definition: "the name and category a person reads for a part of the HUD",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A label is hand-written rather than walked out of the game source.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part covering several controls at once says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part with no label is named from the spelling of its ESO global.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No label is read from the game.",
    },
  ],
} as const satisfies Module
