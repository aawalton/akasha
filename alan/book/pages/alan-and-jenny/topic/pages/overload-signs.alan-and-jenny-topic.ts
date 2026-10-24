import type { AlanAndJennyTopic } from "akasha/alan/book/pages/alan-and-jenny/topic/alan-and-jenny-topic.page-type.types.ts"

export const overloadSigns = {
  id: "01a16f4a-13aa-7bc2-b420-43c428eb887e",
  type: "page-type/alan-and-jenny-topic",
  slug: "overload-signs",
  title: "Overload Signs",
  definition: "the signs that Alan or Jenny is overloaded",
  parents: ["alan-and-jenny-topic/the-marriage"],
  settled:
    "Jenny's account: she slips into reading Alan uncharitably, which the therapist calls sentiment override, when she is overwhelmed, stressed or exhausted, or when she feels unloved or emotionally unsafe.\n\nJenny's account: when Alan's stress is too high, his outward gestures and emotional exchanges largely drop off, and even basic socializing together is often more than he can afford.",
  createdAt: "2026-10-24T19:01:28.104Z",
  updatedAt: "2026-10-24T22:52:35.156Z",
} as const satisfies AlanAndJennyTopic
