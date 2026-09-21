import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const markdownProperty = {
  id: "01a0c4f3-6a9a-7a40-b177-153e253975d5",
  type: "page-type/page-type",
  slug: "markdown-property",
  definition: "a page property holding text written as markdown",
  extends: ["page-type/text-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value of this kind is drawn as the markdown renders rather than as its source.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
