import type { AlanAndJennyTopic } from "akasha/alan/book/pages/alan-and-jenny/topic/alan-and-jenny-topic.page-type.types.ts"

export const agreements = {
  id: "01a16f4a-13a9-7298-9857-02c92228de48",
  type: "page-type/alan-and-jenny-topic",
  slug: "agreements",
  title: "Agreements",
  definition: "the agreements Alan and Jenny have made with each other",
  parents: ["alan-and-jenny-topic/the-marriage"],
  createdAt: "2026-10-24T19:01:28.104Z",
  updatedAt: "2026-10-24T19:01:28.104Z",
} as const satisfies AlanAndJennyTopic
