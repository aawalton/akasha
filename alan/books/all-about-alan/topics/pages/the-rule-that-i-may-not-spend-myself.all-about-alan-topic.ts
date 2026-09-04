import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theRuleThatIMayNotSpendMyself = {
  id: "01a06559-9d65-743a-8ee6-75fa7f632f25",
  pageTypeSlug: "all-about-alan-topic",
  slug: "the-rule-that-i-may-not-spend-myself",
  title: "The Rule That I May Not Spend Myself",
  definition: "the hard rule standing in for a sense of self-preservation I do not have",
  parentSlugs: ["what-has-kept-me-here"],
  relatedSlugs: ["where-my-ethics-meets-my-rules", "what-i-let-myself-take-on"],
  settled:
    "As compiled: if it would hurt me I am not allowed to, even if it would help or spare others, including my future selves.\n\nIt forbids spending myself rather than pushing me to live, and stands on ethics rather than fear.\n\nIt is a floor, not a priority. Below it nothing trades; above it a future gain at no cost now is a duty.\n\nIt replaced the old rule: that I may not do what would hurt other people.\n\nIn the marriage it now reads as do less harm, the one place I could not hold the line.",
  unsettled:
    "Where the old rule came from is untraced: whether it was an explicit rule I was given as a child or a default I never compiled, and whether it shares a root with the rule about wanting things.",
} as const satisfies AllAboutAlanTopic
