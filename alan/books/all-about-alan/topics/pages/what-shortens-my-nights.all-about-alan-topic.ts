import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatShortensMyNights = {
  id: "01a06559-9d65-7684-b991-311139eafe41",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "what-shortens-my-nights",
  title: "What Shortens My Nights",
  definition: "what cuts a night short",
  parents: ["sleep"],
  settled:
    "Stress takes the end of the night and the medication takes the start, so a short night says which one did it.",
} as const satisfies AllAboutAlanTopic
