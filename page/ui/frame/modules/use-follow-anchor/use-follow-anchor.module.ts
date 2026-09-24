import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useFollowAnchor = {
  id: "01a05cce-25ec-7be6-86e8-e3eea2906974",
  type: "page-type/module",
  slug: "use-follow-anchor",
  definition: "a scroll held at an anchor until the reader moves away from it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A scroll held at the end reaches the end of the page, footer and all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scroll held at the end stays there as what is above it grows.",
    },
  ],
} as const satisfies Module
