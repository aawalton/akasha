import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const assignmentGame = {
  id: "01a0d483-495d-76a8-914a-46aea985626c",
  type: "page-type/relation-property",
  slug: "assignment-game",
  propertySlug: "game",
  definition: "a slug naming a game",
  targetPageType: "page-type/game",
  types: "ts",
} as const satisfies RelationProperty
