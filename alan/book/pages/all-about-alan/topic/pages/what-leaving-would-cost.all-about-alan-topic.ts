import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatLeavingWouldCost = {
  id: "01a0c5a3-d139-7ad7-a048-6849ff7c4303",
  type: "page-type/all-about-alan-topic",
  slug: "what-leaving-would-cost",
  title: "What Leaving Would Cost",
  definition: "the worked exit, and the asymmetry that makes holding the reversible side right",
  parents: ["all-about-alan-topic/whether-i-stay"],
  related: [
    "all-about-alan-topic/the-money-we-are-living-on",
    "all-about-alan-topic/the-year-i-am-running",
  ],
  settled:
    "The separation is worked and is not catastrophic on my side. I sign over roughly ninety percent of the assets, about two million, to Jen and the children, and keep about two hundred thousand.\n\nThe children are provided for either way, and the household load Jen carries does not transfer to me.\n\nSo it is not true that I would be worse off if I left, in the way that would settle the question. If staying is right, it is right for some reason other than my own payoff.\n\nWhat decides the timing is reversibility. Staying for now can be undone. Leaving, with the assets and the family structure, cannot.\n\nSo I hold the reversible side until the one thing that can actually decide it arrives. The line I had ready if it came up in the sixteen days: I am not deciding this now, I am holding until the one thing that can actually decide it does.",
} as const satisfies AllAboutAlanTopic
