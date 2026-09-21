import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const gettingOutFromUnderADependency = {
  id: "01a06559-9d65-7364-b67e-9512b86395b0",
  type: "page-type/all-about-alan-topic",
  slug: "getting-out-from-under-a-dependency",
  title: "Getting Out From Under A Dependency",
  definition: "the ways out of depending on someone, ranked by how much trust each one still costs",
  parents: ["all-about-alan-topic/alan"],
  related: ["all-about-alan-topic/which-organisations-i-trust"],
  settled:
    "Doing it myself is a first-class option, not a fallback below finding a better provider.\n\nAhead of every tier sits the question of whether I need the thing at all.\n\nFor a long time the question I asked was which organisation I trust to provide this over the coming decades. That quietly assumed the answer was always another ongoing relationship. The question now is what the lowest-risk way to get the thing is, of any kind, or some mix.\n\nA capability is bought once and amortised, where a relationship is re-evaluated forever.\n\nSwitching swaps one provider for one provider. A capability covers several at once.\n\nWhere the thing is critical and expensive to leave, I layer instead of picking. Switch to somebody trustworthy for the gap now, build the capability for the middle distance, and keep the spread-out option in reserve against the trustworthy one failing the test later.\n\nPublic services used to sit outside the pressure and no longer reliably do.",
} as const satisfies AllAboutAlanTopic
