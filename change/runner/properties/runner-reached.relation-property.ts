import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const runnerReached = {
  id: "01a0815e-e797-751f-b5bb-08f554394d1a",
  type: "page-type/relation-property",
  slug: "runner-reached",
  propertySlug: "reached",
  definition: "the page type whose changes a runner reaches",
  targetPageType: "page-type/page-type",
  types: "ts",
} as const satisfies RelationProperty
