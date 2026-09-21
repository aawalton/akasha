import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const image = {
  id: "019f14c3-27e4-7b72-bc0c-6e12bbd8577a",
  type: "page-type/page-type",
  slug: "image",
  definition: "one picture the system has",
  extends: ["page-type/page"],
  parts: ["file-property/image-bytes"],
  properties: [
    {
      pageProperty: "file-property/image-bytes",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An image carries its own bytes rather than a note of where those bytes are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with no bytes beside it is no image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image made by a run names that run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image catalogued from disk names no run.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
