import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const aGapIsNotAFix = {
  id: "01a0c594-51ad-7e70-a2a8-887f9e579aee",
  type: "page-type/all-about-alan-topic",
  slug: "a-gap-is-not-a-fix",
  title: "A Gap Is Not A Fix",
  definition: "the difference between something missing and something I already depend on badly",
  parents: ["all-about-alan-topic/getting-out-from-under-a-dependency"],
  related: ["all-about-alan-topic/how-i-grade-an-organisation"],
  settled:
    "Where I already lean on something graded low, the question is getting out or swapping it.\n\nWhere I lean on nothing at all, there is nothing to mend, and the question is whether adding one is worth its cost.\n\nThe two do not go in the same queue and are not weighed the same way.\n\nThe umbrella and the long-term care cover are gaps. Almost everything else I have graded is the other kind.",
} as const satisfies AllAboutAlanTopic
