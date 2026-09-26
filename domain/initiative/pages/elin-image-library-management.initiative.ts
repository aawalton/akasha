import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const elinImageLibraryManagement = {
  id: "01a0de74-a006-74a5-9b5c-bcd439801eb1",
  type: "page-type/initiative",
  slug: "elin-image-library-management",
  domain: "page-type/image",
  persona: "persona/elin",
  intentStack: [
    { statement: "Every image states how it was made, well enough to make it again." },
    {
      statement: "Every image states its rung on the closeness ladder as its maturity rating.",
    },
    {
      statement:
        "Alan grades every image he has not graded from a review page, one key to an image.",
    },
  ],
} as const satisfies Initiative
