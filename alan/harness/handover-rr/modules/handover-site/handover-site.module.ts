import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const handoverSite = {
  id: "01a0bb43-f125-7242-ae2b-72157ed7dc6b",
  type: "page-type/module",
  slug: "handover-site",
  definition: "the services where people sign in through alanwalton.com",
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
      statement: "A peripheral is found by its origin as well as by its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The minting route lives at one path, and both sides read that path from here.",
    },
  ],
  createdAt: "2026-09-19T20:03:07.173Z",
  updatedAt: "2026-10-30T15:45:10.243Z",
} as const satisfies Module
