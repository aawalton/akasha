import type { AlanAndJennyTopic } from "akasha/alan/book/pages/alan-and-jenny/topic/alan-and-jenny-topic.page-type.types.ts"

export const agreements = {
  id: "01a16f4a-13a9-7298-9857-02c92228de48",
  type: "page-type/alan-and-jenny-topic",
  slug: "agreements",
  title: "Agreements",
  definition: "the agreements Alan and Jenny have made with each other",
  parents: ["alan-and-jenny-topic/the-marriage"],
  settled:
    "Sessions keep the therapist as mediator, with more of Alan and Jenny addressing, answering and validating each other directly. Jenny asked for this because she felt she was replying to the therapist more than to Alan. The therapist agreed to ask one spouse more often to answer the other directly and to step back while they do, still summarizing and slowing things down where that helps, and to be told if the balance tips too far either way.",
  createdAt: "2026-10-24T19:01:28.104Z",
  updatedAt: "2026-10-25T00:13:27.702Z",
} as const satisfies AlanAndJennyTopic
