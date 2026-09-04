import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whetherTheRuleSurvives = {
  id: "01a06559-9d65-76d7-a5d1-d19e1d99570f",
  pageTypeSlug: "all-about-alan-topic",
  slug: "whether-the-rule-survives",
  title: "Whether The Rule Survives",
  definition: "the church rule against the behaviour, and whether it holds once I look at it",
  parentSlugs: ["sex"],
  settled:
    "The check is decided and I have not run it.\n\nUngrounding the rule still would not settle it, because a separate belief sits over the top: stay with the body of the church, wrong in the small things but never in the big ones.",
  unsettled:
    "What running the check would conclude is pending.\n\nOf the three layers this is the thin one, and how chastity teaching interlocks with the bodily demand is still waiting.",
} as const satisfies AllAboutAlanTopic
