import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markersSharing = {
  id: "01a0de85-2b4c-7501-9939-c66580a689fe",
  type: "page-type/module",
  slug: "markers-sharing",
  definition: "markers sent to the group and taken from it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A share uses the protocols More Markers uses, so either add-on hears the other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is shared without LibGroupBroadcast.",
    },
  ],
} as const satisfies Module
