import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const proofICanDoThings = {
  id: "01a06559-9d65-7ee4-9c61-4d87edae576b",
  type: "page-type/all-about-alan-topic",
  slug: "proof-i-can-do-things",
  title: "Proof I Can Do Things",
  definition: "the safety I get from evidence that I am capable",
  parents: ["all-about-alan-topic/safety-bar"],
  settled:
    "It comes from pointing at something I actually did, never from feeling better about it.\n\nIt closes a loop. A piece of work comes off, I can check for myself that it came off, my safety goes up, and the higher safety pays for the next one.\n\nThat loop is what made programming stick the moment it came back within reach.",
  createdAt: "2026-09-03T03:39:26.949Z",
  updatedAt: "2026-09-21T20:10:10.000Z",
} as const satisfies AllAboutAlanTopic
