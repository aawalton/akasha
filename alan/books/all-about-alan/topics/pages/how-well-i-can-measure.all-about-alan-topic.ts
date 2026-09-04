import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howWellICanMeasure = {
  id: "01a06559-9d65-71de-a5ea-2178378f33d3",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-well-i-can-measure",
  title: "How Well I Can Measure",
  definition: "how sharply I can read one of my own resources",
  parentSlugs: ["resources"],
  settled: "The ladder runs from not knowing a resource exists up to a real number.",
  unsettled:
    "Safety sits at numbered levels with no numeric scale under them. It has been the limiting resource long enough that further resolution might land. Will the anchors go numeric?\n\nCan a reading go backwards? Does a resource lose resolution when I stop attending to it, or do the anchors hold once they have landed?\n\nAnd does the ladder work on anything I track outside my resources?",
} as const satisfies AllAboutAlanTopic
