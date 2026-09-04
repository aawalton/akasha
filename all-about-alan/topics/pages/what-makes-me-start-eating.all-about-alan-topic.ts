import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatMakesMeStartEating = {
  id: "01a06559-9d65-7837-8675-506be4db758e",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-makes-me-start-eating",
  title: "What Makes Me Start Eating",
  definition: "the trigger I built to stand in for a hunger signal that does not arrive",
  parentSlugs: ["how-i-eat"],
  relatedSlugs: ["the-coloured-circles-i-run-on", "the-repeating-i-do-to-settle"],
  settled:
    "Hunger often does not fire at all, and when it does it is gone in a quarter of an hour whether I eat or not.\n\nThere is no fullness signal at either end, so the whole arc is missing.\n\nThe risk runs one way. I skip meals rather than overeat, which is why the household rule exists.\n\nSo I built a trigger: points and a stoplight I want to move green, then blue.\n\nRanked by what actually starts a meal: stimming first, then food someone brought me, then the points, then rarely hunger.",
  unsettled:
    "The green-to-blue pull was written up from a design session rather than from anything I said. A first-person account of reaching for food to move the light would anchor it.\n\nWhether stress reaches my appetite by any bodily route, rather than only through capacity and convenience, is undocumented and may be absent.",
} as const satisfies AllAboutAlanTopic
