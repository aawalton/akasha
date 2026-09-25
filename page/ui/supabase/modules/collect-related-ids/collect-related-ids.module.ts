import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collectRelatedIds = {
  id: "01a05c7d-d06c-7ecc-bcb5-d58257b7a42f",
  type: "page-type/module",
  slug: "collect-related-ids",
  definition:
    "what a set of pages name through their relations, filed by page type and by how it is asked",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation value that is a uuid is asked for by id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation value that is an address is asked for by the slug that address names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is asked of the page type it names rather than of the target type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation value naming no page type is asked of the target type by slug.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "An address naming a scope is asked for by the slug at that address's end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page unique only within a scope is related where its scoped address or id is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's scoped address is read as the page resolver keys that page.",
    },
  ],
} as const satisfies Module
