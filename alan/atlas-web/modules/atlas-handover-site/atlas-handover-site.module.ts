import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const atlasHandoverSite = {
  id: "01a0bb46-11c3-76f3-84e4-f735a56d061d",
  type: "page-type/module",
  slug: "atlas-handover-site",
  definition:
    "what Atlas is called in a handover, where Atlas answers, and the key Atlas signs with",
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
} as const satisfies Module
