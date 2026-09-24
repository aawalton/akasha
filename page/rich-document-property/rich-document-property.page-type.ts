import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const richDocumentProperty = {
  id: "01a0c670-5192-778f-84a7-e034f56f86c6",
  type: "page-type/page-type",
  slug: "rich-document-property",
  definition: "a page property holding a document written as a tree of blocks",
  icon: "file-text",
  extends: ["page-type/page-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value of this kind is a tree of blocks rather than a line of text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value of this kind is edited in place on the page carrying that value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value drawn away from the page carrying it reads as its opening line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The blocks are held as page data rather than in a file beside the page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
