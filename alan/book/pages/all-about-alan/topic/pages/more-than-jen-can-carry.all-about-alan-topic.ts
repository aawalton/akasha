import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const moreThanJenCanCarry = {
  id: "01a15ebe-76ac-70e6-856c-29bf41324bf4",
  type: "page-type/all-about-alan-topic",
  slug: "more-than-jen-can-carry",
  title: "More Than Jen Can Carry",
  definition: "whether my marriage could carry the whole of the Child's need for connection",
  parents: ["all-about-alan-topic/keeping-the-professor-and-the-child-fed"],
  related: [
    "all-about-alan-topic/living-with-jen",
    "all-about-alan-topic/where-connection-could-come-from",
  ],
  settled:
    "I am not sure my relationship with Jen could carry the whole weight of the Child's need for connection, even in the best-case circumstances. That leaves me feeling discouraged.\n\nI think the interventions that do not go through Jen need evaluating more carefully as well.",
  createdAt: "2026-10-21T13:55:02.955Z",
  updatedAt: "2026-10-21T13:55:02.955Z",
} as const satisfies AllAboutAlanTopic
