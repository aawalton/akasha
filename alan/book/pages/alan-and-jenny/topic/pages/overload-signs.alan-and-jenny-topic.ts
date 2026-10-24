import type { AlanAndJennyTopic } from "akasha/alan/book/pages/alan-and-jenny/topic/alan-and-jenny-topic.page-type.types.ts"

export const overloadSigns = {
  id: "01a16f4a-13aa-7bc2-b420-43c428eb887e",
  type: "page-type/alan-and-jenny-topic",
  slug: "overload-signs",
  title: "Overload Signs",
  definition: "the signs that Alan or Jenny is overloaded",
  parents: ["alan-and-jenny-topic/the-marriage"],
  settled:
    "Jenny's account: she slips into reading Alan uncharitably, which the therapist calls sentiment override, when she is overwhelmed, stressed or exhausted, or when she feels unloved or emotionally unsafe.",
  createdAt: "2026-10-24T19:01:28.104Z",
  updatedAt: "2026-10-24T21:56:11.208Z",
} as const satisfies AlanAndJennyTopic
