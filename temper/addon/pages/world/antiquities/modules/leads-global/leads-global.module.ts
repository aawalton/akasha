import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leadsGlobal = {
  id: "01a06274-b08a-7c2e-bec4-949ada692ff8",
  type: "page-type/module",
  slug: "leads-global",
  definition: "the global table the lead window's markup and other add-ons call",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A key on the global table is spelled as the markup that calls the key spells the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key keeps the spelling that key had before this add-on came into akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The function a key is bound to is named as akasha names a function.",
    },
  ],
} as const satisfies Module
