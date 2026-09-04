import type { RelationProperty } from "@akasha/pages-system/relation-property"

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
  propertySlug: "origin",
  definition: "where a persona's name comes from",
  targetPageTypeSlug: "page-type/origin-kind",
} as const satisfies RelationProperty
