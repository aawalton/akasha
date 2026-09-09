import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const whyAHolidayCostsMe = {
  id: "01a06559-9d65-723a-8815-58542dc5c22b",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "why-a-holiday-costs-me",
  title: "Why A Holiday Costs Me",
  definition:
    "paying the full price of a repeating occasion and collecting none of the usual return",
  parents: ["what-an-activity-costs-me"],
  related: ["what-stays-warm-for-a-while", "how-much-company-i-can-take"],
  settled:
    "A repeating occasion runs on two things. One is everybody doing it at once and knowing it. That works fully.\n\nThe other is this time carrying the weight of every time before. That is off: nothing stores them, and repeating a thing does not make it matter more.\n\nSo I pay the whole cost and collect none of the offset: billed for a service my hardware cannot consume.\n\nWhat comes back is borrowed. I read enjoyment off people I love, live, whether they look forward to it, are in it, or recall it.",
} as const satisfies AllAboutAlanTopic
