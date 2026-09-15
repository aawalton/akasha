import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const runningOutOfContent = {
  id: "01a06559-9d65-7ee0-a9ed-72652fa93ce2",
  type: "page-type/all-about-alan-topic",
  slug: "running-out-of-content",
  title: "Running Out Of Content",
  definition: "having no world of my own to go into, so I need other people's",
  parents: ["all-about-alan-topic/what-pulls-me-into-doing-something"],
  settled:
    "Other people can retreat inward for the same mix of the familiar and the new. I have nothing to retreat to.",
} as const satisfies AllAboutAlanTopic
