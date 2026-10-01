import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const sceneImages = {
  id: "01a0f989-7860-7eba-93de-3c93e9601896",
  type: "page-type/multi-relation-property",
  slug: "scene-images",
  propertySlug: "scenes",
  definition: "the pictures of a written chapter's scenes, in the order the prose reaches them",
  targetPageType: "page-type/image",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A written chapter is pictured by ten scenes spread through its prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's cover is one of its scenes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter stating no scenes is shown by its cover alone.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
