import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageQuery = {
  id: "01a05aec-eaaa-785b-b175-87946b2c2eb7",
  type: "page-type/domain",
  slug: "page-query",
  definition: "how code calls the page service",

  parts: [
    "module/store-carrying",
    "module/store-page-asking",
    "module/store-questioning",
    "module/store-reaching",
    "module/store-spelled-asking",
    "module/store-spelling",
    "module/store-writing",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This package has the store half of `@shared/pages-query` rather than the router.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller keeps the name and the signature the caller already spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question the store cannot answer is refused rather than answered as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test the store does not run is run here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a page's file.",
    },
  ],
  createdAt: "2026-09-01T03:04:31.146Z",
  updatedAt: "2026-09-27T06:10:35.000Z",
} as const satisfies Domain
