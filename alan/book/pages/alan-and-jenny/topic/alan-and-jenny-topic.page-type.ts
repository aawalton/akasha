import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const alanAndJennyTopic = {
  id: "01a16f48-1aba-723f-9982-82e6b22eac6c",
  type: "page-type/page-type",
  slug: "alan-and-jenny-topic",
  definition: "a topic about Alan and Jenny's marriage",
  extends: ["page-type/page"],
  parts: ["multi-relation-property/alan-and-jenny-topic-parents"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
    {
      pageProperty: "multi-relation-property/alan-and-jenny-topic-parents",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/topic-settled", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Containment is carried by a topic's parents rather than by folders.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Exactly one topic sits under no topic.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A topic with no settled text is a title and a definition alone.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-24T18:59:18.841Z",
  updatedAt: "2026-10-24T18:59:18.841Z",
} as const satisfies PageType
