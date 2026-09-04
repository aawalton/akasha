import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theThreeWaysAnAgentGetsItWrong = {
  id: "01a047c8-d164-76b0-bab2-11688b8c7987",
  pageTypeSlug: "all-about-alan-topic",
  slug: "the-three-ways-an-agent-gets-it-wrong",
  title: "The Three Ways An Agent Gets It Wrong",
  definition: "the failure categories only an instruction can catch",
  parentSlugs: ["how-i-prevent-a-category-of-wrong"],
  settled:
    "On the instructions side the big categories of wrong I have seen are an agent seeing a term and assuming it meant something different than it did in this context, an agent assuming something would be implemented in a different way than it was, and an agent just doing the wrong thing for this context.\n\nThe domain system is a set of well-refined tools for addressing those directly and concisely without context bloat: Domain Definition, Domain Invariants, Domain Directives.",
  unsettled: "Whether those three are the whole set, or the three I have hit most, is not settled.",
} as const satisfies AllAboutAlanTopic
