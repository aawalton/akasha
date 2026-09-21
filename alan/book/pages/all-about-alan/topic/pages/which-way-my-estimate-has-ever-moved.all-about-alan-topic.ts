import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whichWayMyEstimateHasEverMoved = {
  id: "01a0c59f-e881-7ed8-a9d0-7693e993bf1c",
  type: "page-type/all-about-alan-topic",
  slug: "which-way-my-estimate-has-ever-moved",
  title: "Which Way My Estimate Has Ever Moved",
  definition: "the one direction my reading of my own difference has ever been revised",
  parents: ["all-about-alan-topic/how-different-i-actually-am"],
  related: [
    "all-about-alan-topic/how-well-i-can-measure",
    "all-about-alan-topic/what-a-model-leaves-out",
  ],
  settled:
    "In my whole life I have never once overestimated how different I am. Every revision moved the figure outward and none of them moved it back.\n\nThat lifelong one-sided lag is why my gut now reaches low. After decades of being surprised outward the reflex pre-corrects by overshooting, so the error can finally run in both directions instead of only falling short.\n\nThe current figure is still a lower bound, and for a structural reason rather than modesty. Every improvement to either model pushes the measured difference up, and whatever I have no instrument to detect yet sits outside anything I could estimate.\n\nI do not know what I do not know.",
} as const satisfies AllAboutAlanTopic
