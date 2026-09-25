import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const innworldShelves = {
  id: "01a0d929-ff30-731e-a86a-0d028fda7fc1",
  type: "page-type/module",
  slug: "innworld-shelves",
  definition: "the shelves this wiki's front page sets out",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The shelves are the nav items naming this site, in the order the sidebar has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The items under no section share one shelf with no heading, ahead of the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each section is a shelf of its own, headed by the section's title.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The item leading to the front page is on no shelf.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry states the definition of the page type its link reaches.",
    },
  ],
} as const satisfies Module
