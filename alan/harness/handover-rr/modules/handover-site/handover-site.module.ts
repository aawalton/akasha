import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const handoverSite = {
  id: "01a0bb43-f125-7242-ae2b-72157ed7dc6b",
  type: "page-type/module",
  slug: "handover-site",
  definition: "what a site is called, where a site answers, and which peripherals a code may name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A peripheral is allowed by a list written here rather than by a page looked up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A peripheral's origin is written out whole rather than built from its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The minting route lives at one path, and both sides read that path from here.",
    },
  ],
} as const satisfies Module
