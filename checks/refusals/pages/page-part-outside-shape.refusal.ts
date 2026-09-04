import type { Refusal } from "../refusal.page-type.ts"

export const pagePartOutsideShape = {
  id: "01a06611-3997-7a00-bd4f-6d0750b8e9a4",
  pageTypeSlug: "refusal",
  slug: "page-part-outside-shape",
  title: "Page part outside shape",
  text: "{where} holds {part} outside the shape its page type states: expected {expected}, measured {measured}. A page type's shape is what every reader below is promised the page holds, so a part outside it is read as though it were inside.",
} as const satisfies Refusal
