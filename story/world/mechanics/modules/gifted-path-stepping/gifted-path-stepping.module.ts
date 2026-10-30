import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const giftedPathStepping = {
  id: "01a18d0a-be56-741d-8d62-a97f46fc55da",
  type: "page-type/module",
  slug: "gifted-path-stepping",
  definition: "what a Path a character holds in the gifted world earns and what its Tiers pay",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Basic Path's Tier pays its attribute a point, its ninth an Unallocated Stat and its tenth two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Talented speeds steps by a fifth of its value in percent, and Gifted by two fifths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Who holds a Path, its title and its Tiers are read off the index when a check settles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Path named by no page is its holder's where the holder's slug and a hyphen begin its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character's Unallocated Stats are its world's unallocated stats page stating that character.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Nothing here imports a page of one story, so a clone of that story settles by it.",
    },
  ],
  createdAt: "2026-10-30T13:40:53.973Z",
  updatedAt: "2026-10-30T13:40:53.973Z",
} as const satisfies Module
