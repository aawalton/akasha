import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatMakesAPersonExpensive = {
  id: "01a07866-7795-75e8-9ed9-5c69ef2ffc1a",
  type: "page-type/all-about-alan-topic",
  slug: "what-makes-a-person-expensive",
  title: "What Makes A Person Expensive",
  definition: "what drives the difficulty I rate time with a particular person at",
  parents: ["all-about-alan-topic/how-much-company-i-can-take"],
  related: [
    "all-about-alan-topic/why-i-overspend-on-the-marriage",
    "all-about-alan-topic/why-getting-close-hurts",
    "all-about-alan-topic/why-people-read-as-unsafe",
  ],
  settled:
    "Lizzy is usually a two. That was counted out of my session tracking rather than recalled, so it is a reading of the record rather than something I said.\n\nJen is conflict-able. She does not seek conflict out and she does not avoid it either.",
} as const satisfies AllAboutAlanTopic
