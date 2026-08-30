import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type Origin =
  | "canon"
  | "celtic"
  | "greek"
  | "hebrew"
  | "human"
  | "invented"
  | "norse"
  | "sanskrit"
  | "welsh"

export const origin = {
  id: "01a05361-be60-75b4-83d8-12b5629c3381",
  pageTypeSlug: "relation-property",
  slug: "origin",
  definition: "where a persona's name comes from",
  targetPageTypeSlug: "page-type/origin-kind",
} as const satisfies RelationProperty
