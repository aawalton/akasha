import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const image = {
  id: "019f14c3-27e4-7b72-bc0c-6e12bbd8577a",
  type: "page-type/page-type",
  slug: "image",
  definition: "one picture the system has",
  extends: ["page-type/page"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An image's bytes sit in the object store under the image's own id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image's bytes sit on disk where the image says those bytes were written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image records where its bytes are rather than the bytes.",
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
