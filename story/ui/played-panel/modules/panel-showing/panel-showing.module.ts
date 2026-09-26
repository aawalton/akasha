import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const panelShowing = {
  id: "01a0c4ab-ec99-7068-9d18-3a05031aa5d3",
  type: "page-type/module",
  slug: "panel-showing",
  definition: "a panel made of a component and what that component is handed off the envelope",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel's own page names a component and says what to hand it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel's own page writes no markup, so its code runs in a browser unturned.",
    },
  ],
} as const satisfies Module
