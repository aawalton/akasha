import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const atlasHandoverSite = {
  id: "01a0bb46-11c3-76f3-84e4-f735a56d061d",
  type: "page-type/module",
  slug: "atlas-handover-site",
  definition: "how the Atlas app takes part in a handover",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Atlas is named `atlas` in a handover, and alanwalton.com knows that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Atlas signs its own cookie with `ATLAS_SESSION_KEY`.",
    },
  ],
  createdAt: "2026-09-19T20:05:26.595Z",
  updatedAt: "2026-10-30T16:01:49.969Z",
} as const satisfies Module
