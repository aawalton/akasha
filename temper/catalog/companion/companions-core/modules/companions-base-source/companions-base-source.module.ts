import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsBaseSource = {
  id: "01a06152-c2d1-730e-a4ec-8f2ee2d4c798",
  type: "page-type/module",
  slug: "companions-base-source",
  definition: "gatherer data file of every companion's flat base stats at the start",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each base stat is read from its own page rather than written here.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The single source companion-base-stats has every base stat page's effect.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The source is named by the companion-base source category page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The source's id names no page; it only keeps the source apart from others.",
    },
  ],
} as const satisfies Module
