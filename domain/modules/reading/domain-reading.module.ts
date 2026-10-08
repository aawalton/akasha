import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const domainReading = {
  id: "01a06949-b280-73e9-9ded-65530eee9efa",
  type: "page-type/module",
  slug: "domain-reading",
  definition: "the path, slug and address of every domain page in a repo",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is read for every page type that descends from domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose file will not load is left out rather than raising an error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no slug or no page type is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's address is its page type slug and its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading for a root is done once and reused.",
    },
  ],
  createdAt: "2026-09-03T22:00:32.640Z",
  updatedAt: "2026-09-24T16:46:42.000Z",
} as const satisfies Module
