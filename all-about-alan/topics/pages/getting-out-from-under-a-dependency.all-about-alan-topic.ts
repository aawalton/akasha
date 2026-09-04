import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const gettingOutFromUnderADependency = {
  id: "01a06559-9d65-7364-b67e-9512b86395b0",
  pageTypeSlug: "all-about-alan-topic",
  slug: "getting-out-from-under-a-dependency",
  title: "Getting Out From Under A Dependency",
  definition: "the ways out of depending on someone, ranked by how much trust each one still costs",
  parentSlugs: ["alan"],
  relatedSlugs: ["which-organisations-i-trust"],
  settled:
    "Doing it myself is a first-class option, not a fallback below finding a better provider.\n\nAhead of every tier sits the question of whether I need the thing at all.\n\nA capability is bought once and amortised, where a relationship is re-evaluated forever.\n\nSwitching swaps one provider for one provider. A capability covers several at once.\n\nPublic services used to sit outside the pressure and no longer reliably do.",
  unsettled:
    "The viability tests — cost ceiling, quality floor, transition, durability — are all informal.\n\nA capability alternative has to be maintainable, and the ways that fails are unenumerated.\n\nSwitching one thing often forces switching another, and that cascade is folded into switching cost.\n\nImpossible to exit and expensive to exit are not told apart, though that decides leaving from paying.\n\nTwo concentrations fall outside it: one critical thing with no spare, and one supplier holding several roles.",
} as const satisfies AllAboutAlanTopic
