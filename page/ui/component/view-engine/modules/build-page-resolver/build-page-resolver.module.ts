import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildPageResolver = {
  id: "01a06158-0a79-7000-a2b2-4fa802b18c2d",
  type: "page-type/module",
  slug: "build-page-resolver",
  definition:
    "Builds a resolver taking a page id or a page address to its title, color and sort order.",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is keyed here by its address as well as by its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's address is its page type's slug and its own slug, parted by a slash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no page type slug takes one from the page type its id names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page whose slug is unique only within a scope is keyed by the address naming that scope's slug.",
    },
  ],
} as const satisfies Module
