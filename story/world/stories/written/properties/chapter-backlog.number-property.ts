import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const chapterBacklog = {
  id: "01a10199-0b02-7659-9be2-258ac2509f8e",
  type: "page-type/number-property",
  slug: "chapter-backlog",
  propertySlug: "chapter-backlog",
  definition: "how many unread chapters a written story keeps written ahead",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story stating no backlog keeps one unread chapter, as a backlog of one does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter counts toward the backlog where it is published and unread.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
