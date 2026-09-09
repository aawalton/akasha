import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const theThreePartsOfMe = {
  id: "01a06559-9d65-7824-8af1-1939e6705e28",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-three-parts-of-me",
  title: "The Three Parts Of Me",
  definition: "mind, feeling and body, and how far apart mine sit",
  parents: ["alan"],
  related: ["driving-myself-like-a-machine", "how-much-of-me-is-machine"],
  settled:
    "Most people run the three as one. Mine come apart far enough that I am nearly two people: one all concept, and one feeling and body together.\n\nEighty percent map, ten percent feeling, ten percent body.\n\nSo my war is mind against body, with what feeling I can reach taking the body's side. The head-against-heart story slides past me.\n\nIt is not a wall. Enough physical load floods across into the thinking half.\n\nThe smallest part, the will to live, is what carried me through the worst years.",
} as const satisfies AllAboutAlanTopic
