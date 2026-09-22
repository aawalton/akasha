import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const alanBook = {
  id: "01a06d23-26a9-7d50-bca7-7aa5849e1c17",
  type: "page-type/page-type",
  slug: "alan-book",
  definition: "a book Alan writes",
  extends: ["page-type/collection", "page-type/domain"],
  parts: [
    "alan-book/all-about-alan",
    "alan-book/learn-everything",
    "alan-book/my-faith",
    "alan-book/my-math",
    "alan-book/my-projects",
    "alan-book/my-strategy",
  ],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A book Alan is writing is read by nobody else while Alan writes that book.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A book Alan writes states nothing a publisher assigns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A book Alan writes is a domain, and what that domain holds is what the book is made of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A book made of sections is a collection, and those sections name it as the one they are in.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
