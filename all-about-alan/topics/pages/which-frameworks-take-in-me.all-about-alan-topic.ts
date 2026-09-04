import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whichFrameworksTakeInMe = {
  id: "01a06559-9d65-75dd-9084-3d069d742af1",
  pageTypeSlug: "all-about-alan-topic",
  slug: "which-frameworks-take-in-me",
  title: "Which Frameworks Take In Me",
  definition: "why some ways of working install in a single read and others I fight and never keep",
  parentSlugs: ["the-scaffolding-i-built"],
  relatedSlugs: ["how-a-skill-gets-into-me", "which-lever-reaches-a-response"],
  settled:
    "Some fit my grain closely enough to go in whole on one reading. Others I argue with the whole way through and never stick with.",
  unsettled:
    "What separates the two has never been pinned at the level of mechanism, so I can only call it after the fact.\n\nNo full list exists of the ones I took up, and the ones I took up and later dropped are the part most clearly missing. Those are where the fit fails.",
} as const satisfies AllAboutAlanTopic
