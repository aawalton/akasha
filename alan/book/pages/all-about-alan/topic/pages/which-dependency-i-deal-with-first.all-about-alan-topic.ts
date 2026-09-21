import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whichDependencyIDealWithFirst = {
  id: "01a0c592-15d2-7cd2-adbc-65f12d4023c2",
  type: "page-type/all-about-alan-topic",
  slug: "which-dependency-i-deal-with-first",
  title: "Which Dependency I Deal With First",
  definition: "three factors multiplied together to order what I work on next",
  parents: ["all-about-alan-topic/getting-out-from-under-a-dependency"],
  related: [
    "all-about-alan-topic/how-i-grade-an-organisation",
    "all-about-alan-topic/a-dependency-that-only-exists-for-another-one",
  ],
  settled:
    "I order the list by how critical the thing is, times how likely they are to degrade, times what leaving would cost me.\n\nThe three multiply rather than add. A near-zero anywhere drops an item out of the top tier.\n\nCritical, degrading, trivial to leave: just leave. Critical, trusted, expensive to leave: stay. Not critical, degrading, expensive: annoying, and it waits.\n\nEach factor gets one to four, so the product runs one to sixty-four. Sorting on that is enough to begin with. A finer number can wait.\n\nIt forces me to pick an order, because I cannot fix everything at once.\n\nIt surfaces the thing I have been avoiding because the fix is hard, which is exactly what should be first.\n\nIt demotes what merely annoys me. Not critical and easy to leave means leave it and move on.\n\nI re-run it when conditions change. An organisation that newly begins degrading gets re-ranked.",
} as const satisfies AllAboutAlanTopic
