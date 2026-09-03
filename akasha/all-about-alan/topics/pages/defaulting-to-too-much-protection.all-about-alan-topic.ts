import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const defaultingToTooMuchProtection = {
  id: "01a06559-9d65-70c5-a4f1-b33387c55edd",
  pageTypeSlug: "all-about-alan-topic",
  slug: "defaulting-to-too-much-protection",
  title: "Defaulting To Too Much Protection",
  definition: "starting at the protective extreme and easing off from there",
  parentSlugs: ["what-my-senses-cost-me"],
  settled:
    "Being under-protected costs me much more than being over-protected, which is what makes the extreme the right default.\n\nIt holds for sound and for clothes. Full cancelling by default, tight by default, relief downward when I need it.\n\nThe relief is partial. The deepest layer keeps running.\n\nThe weighted blanket is the negative case, left off by default because its cost shape is not asymmetric.",
  unsettled:
    "Whether it holds for light too, where the load is smaller, is open.\n\nWhether the loose break fires on mana alone or on mana and safety together is open.",
} as const satisfies AllAboutAlanTopic
