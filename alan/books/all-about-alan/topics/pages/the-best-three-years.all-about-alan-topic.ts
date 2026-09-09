import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const theBestThreeYears = {
  id: "01a06559-9d65-7b6c-ae0a-70237f9fd825",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-best-three-years",
  title: "The Best Three Years",
  definition: "college at sixteen, run at maximum autonomy, and why I rate it highest",
  parents: ["alan"],
  related: ["playing-the-long-game", "where-safety-has-got-to", "how-i-get-anything-done"],
  settled:
    "What made them best was that everything was chosen, difficulty included, rather than anything achieved.\n\nSixteen to eighteen credits, dance classes, a job, and hours a day walking.\n\nTalking to strangers was effortful and affordable. High capacity and high safety kept the multiplier low.\n\nI asked ten new people a day for the hardest course they had taken, triangulated, and took all of them.\n\nA's in the hard courses and B's in the easy ones, because the hard ones handed me attention for free.",
} as const satisfies AllAboutAlanTopic
