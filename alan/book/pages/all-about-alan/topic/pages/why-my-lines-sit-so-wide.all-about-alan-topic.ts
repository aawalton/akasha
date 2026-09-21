import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyMyLinesSitSoWide = {
  id: "01a0c5eb-da27-7745-9925-bb560ce55e49",
  type: "page-type/all-about-alan-topic",
  slug: "why-my-lines-sit-so-wide",
  title: "Why My Lines Sit So Wide",
  definition:
    "the loss function behind the wide margins on my rules, and the flat categories they run on",
  parents: ["all-about-alan-topic/my-rules-about-other-women"],
  related: ["all-about-alan-topic/why-getting-close-hurts"],
  settled:
    "The margins are wide on purpose. One bad hour costs me about ten good ones, so defence beats offence by an order of magnitude, and avoiding the bad tail is worth far more than chasing the reward. A bright-line map with conservative margins is the right policy for a cost dominated by its downside.\n\nMy categories are flat: spouse, children, other women, other men, and not much finer. Without an internal model or live cue-reading, I treat everyone in a category the same.\n\nThe substitution is the one autism forces everywhere: an explicit rule in place of the calibration I never absorbed.",
} as const satisfies AllAboutAlanTopic
