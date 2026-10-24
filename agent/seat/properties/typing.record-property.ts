import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const typing = {
  id: "01a16ffe-f46d-772f-8b93-9f09f26b202b",
  type: "page-type/record-property",
  slug: "typing",
  propertySlug: "typing",
  definition: "the persons typing a message to a seat, and when each last typed",
  properties: [
    { pageProperty: "relation-property/typing-person", required: true, many: false },
    { pageProperty: "instant-property/typed-at", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A person is typing for eight seconds after that person last typed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person states at most one entry here, and writes only their own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's page shows who else is typing, and never the person reading it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The agent in the seat is never told who is typing.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-24T22:19:02.125Z",
  updatedAt: "2026-10-24T22:19:02.125Z",
} as const satisfies RecordProperty
