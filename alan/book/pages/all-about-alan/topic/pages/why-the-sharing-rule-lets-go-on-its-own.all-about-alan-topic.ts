import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyTheSharingRuleLetsGoOnItsOwn = {
  id: "01a0c5fd-7ecd-7370-ac7c-0ed2976092d8",
  type: "page-type/all-about-alan-topic",
  slug: "why-the-sharing-rule-lets-go-on-its-own",
  title: "Why The Sharing Rule Lets Go On Its Own",
  definition:
    "the condition written into my sharing rule that makes it stop firing as the wound heals",
  parents: ["all-about-alan-topic/act-rules-and-result-rules"],
  related: [
    "all-about-alan-topic/what-the-scar-makes-me-do",
    "all-about-alan-topic/where-the-scar-ends",
  ],
  settled:
    "The sharing rule dissolves itself. Its condition is that I cannot separate criticism of me from criticism of what I made, which is the fusion the creativity scar runs on. As that seam heals, a critique of the work stops landing as a critique of me, sharing stops being unaffordable, and the rule stops firing.\n\nSo it holds the gate until the seam heals and then lets go. A titration valve rather than a wall.",
} as const satisfies AllAboutAlanTopic
