import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howTheBarsPullOnEachOther = {
  id: "01a06559-9d65-78f3-854a-d7a403a8c74e",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-the-bars-pull-on-each-other",
  title: "How The Bars Pull On Each Other",
  definition: "what being low on one resource does to the others",
  parentSlugs: ["resources"],
  settled: "Being low on one lowers the ceiling on another rather than only spending it.",
  unsettled:
    "One inversion is captured, where the move that recovers a resource is gated by that resource. Whether other pairs invert the same way has never been searched.\n\nHealth lowering the mana and stamina ceiling is captured, and so is safety changing what sensory input costs. The rest are open: does low safety drain mana, does low stamina cap mana, does low capacity lower the mana and stamina ceiling? And is the loose-clothing break trigger mana alone, or mana and safety together?",
} as const satisfies AllAboutAlanTopic
