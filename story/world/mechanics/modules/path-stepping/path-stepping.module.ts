import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pathStepping = {
  id: "01a18d0a-be56-741d-8d62-a97f46fc55da",
  type: "page-type/module",
  slug: "path-stepping",
  definition: "what a Path a character holds earns and what its Tiers pay",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
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
        "A check names the page type its own world keeps Unallocated Stats in, with that world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character's Unallocated Stats are the page of its world's type of that name stating it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names one world or imports a page of one.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Nothing here imports a page of one story, so a clone of that story settles by it.",
    },
  ],
  createdAt: "2026-10-30T13:40:53.973Z",
  updatedAt: "2026-10-30T16:28:17.320Z",
} as const satisfies Module
