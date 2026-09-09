import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const whatMakesAPersonExpensive = {
  id: "01a07866-7795-75e8-9ed9-5c69ef2ffc1a",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "what-makes-a-person-expensive",
  title: "What Makes A Person Expensive",
  definition: "what drives the difficulty I rate time with a particular person at",
  parents: ["how-much-company-i-can-take"],
  related: [
    "why-i-overspend-on-the-marriage",
    "why-getting-close-hurts",
    "why-people-read-as-unsafe",
  ],
  settled:
    "Conflict is the single biggest factor in what a person's company costs me.\n\nLizzy is usually a two, and I think that is because she is very conflict-avoidant.\n\nJen is conflict-able. She does not seek conflict out and she does not avoid it either.",
} as const satisfies AllAboutAlanTopic
