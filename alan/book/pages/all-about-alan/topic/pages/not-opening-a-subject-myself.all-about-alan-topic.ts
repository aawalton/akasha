import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const notOpeningASubjectMyself = {
  id: "01a0c59a-b750-7817-8d3e-83ebdb29445a",
  type: "page-type/all-about-alan-topic",
  slug: "not-opening-a-subject-myself",
  title: "Not Opening A Subject Myself",
  definition: "the rule I replaced spouses-talk-about-anything with, and what it concedes",
  parents: ["all-about-alan-topic/living-with-jen"],
  related: [
    "all-about-alan-topic/what-we-cannot-talk-about",
    "all-about-alan-topic/how-a-hard-talk-with-jen-gets-safer",
  ],
  settled:
    "The default script is that spouses can talk to each other about anything. I gave that one up.\n\nI cannot reliably predict which subjects are unsafe, so the only policy left is not to open one myself, and to be ready to handle it when she opens one.\n\nThat is a straight concession of my own truth-value inside my most intimate relationship.\n\nPreparing for high-stakes time with her, the two halves are not equally hard. Managing my capacity I have done for decades and have good scripts for. The conversation is the half I worry about.\n\nThe one lever that helps is that she does very well with explicit communication. So I name things out loud rather than leave them to be read, including naming recovery, so quiet time registers as recovery rather than as withdrawal.",
} as const satisfies AllAboutAlanTopic
