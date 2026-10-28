import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const panelCard = {
  id: "01a05b82-8b99-7f63-8eac-346953fca966",
  type: "page-type/module",
  slug: "panel-card",
  definition: "a card a browser draws around a panel of content",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel card sits one surface level above the level it is drawn on.",
    },
  ],
  createdAt: "2026-09-01T05:47:57.209Z",
  updatedAt: "2026-10-28T22:21:13.119Z",
} as const satisfies Module
