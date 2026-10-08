import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const runnerReached = {
  id: "01a0815e-e797-751f-b5bb-08f554394d1a",
  type: "page-type/relation-property",
  slug: "runner-reached",
  propertySlug: "reached",
  definition: "the page type whose changes a runner reaches",
  targetPageType: "page-type/page-type",
  types: "ts",
  createdAt: "2026-09-08T14:14:35.671Z",
  updatedAt: "2026-09-22T18:56:50.000Z",
} as const satisfies RelationProperty
