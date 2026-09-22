import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nextBossMenu = {
  id: "01a06157-835a-76b0-9eb4-90b8d1db3184",
  type: "page-type/module",
  slug: "next-boss-menu",
  definition: "the settings panel a player turns this tracker's parts on and off from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A setting takes effect the moment that setting changes rather than on the next reload.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The saved variables are read before the panel is built.",
    },
  ],
} as const satisfies Module
