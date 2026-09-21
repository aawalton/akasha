import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const twoConditionsOrOne = {
  id: "01a06559-9d65-7274-9193-07f0f99e4e11",
  type: "page-type/all-about-alan-topic",
  slug: "two-conditions-or-one",
  title: "Two Conditions Or One",
  definition: "whether autism and ADHD in me are two things or one thing showing up twice",
  parents: ["all-about-alan-topic/having-adhd"],
  related: [
    "all-about-alan-topic/how-different-i-actually-am",
    "all-about-alan-topic/how-i-get-anything-done",
  ],
  settled:
    "My executive function takes a hit from each, and only the ADHD side has anything aimed at it.\n\nThe autism half of that damage usually goes uncredited. The ADHD side is the visible one, so it gets the blame for both.\n\nMy swing between too much and too little stimulation is the classic shape of having both. I read it as evidence for something stronger, which I hold as a working frame rather than as settled: that one substrate underlies both, and the two diagnoses are surface presentations of it. More connections and less pruned away is the substrate, and which way it shows depends on what is regulating the traffic on it.",
} as const satisfies AllAboutAlanTopic
