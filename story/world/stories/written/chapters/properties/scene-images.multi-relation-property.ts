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
      statement:
        "A written chapter's scenes are the pictures of what its story shows for the first time there.",
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
  createdAt: "2026-10-01T22:15:31.168Z",
  updatedAt: "2026-10-02T16:49:56.000Z",
} as const satisfies MultiRelationProperty
