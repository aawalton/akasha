import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const viewEmbeddedBy = {
  id: "01a0e9c5-2c88-7054-9397-eb29fc5b95fc",
  type: "page-type/relation-property",
  slug: "view-embedded-by",
  propertySlug: "embedded-by",
  definition: "the page type each of whose pages draws this view beneath itself",
  targetPageType: "page-type/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A view names the page type embedding that view by that page type's own slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page of that page type draws the view narrowed to the pages that name that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The narrow to the page drawing the view is never written to the view.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view one page type embeds is drawn by no listing of the page type it lists.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
