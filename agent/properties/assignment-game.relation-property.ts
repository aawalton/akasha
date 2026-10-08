import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const assignmentGame = {
  id: "01a0d483-495d-76a8-914a-46aea985626c",
  type: "page-type/relation-property",
  slug: "assignment-game",
  propertySlug: "game",
  definition: "the story an agent runs",
  targetPageType: "page-type/story",
  types: "ts",
  createdAt: "2026-09-24T17:42:48.925Z",
  updatedAt: "2026-09-28T18:10:20.000Z",
} as const satisfies RelationProperty
