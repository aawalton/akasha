import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theCheapestWayOutOfADependency = {
  id: "01a0c5a8-00fa-73ce-99f1-c9a7f52b365a",
  type: "page-type/all-about-alan-topic",
  slug: "the-cheapest-way-out-of-a-dependency",
  title: "The Cheapest Way Out Of A Dependency",
  definition: "changing what I consume, against acquiring a capability",
  parents: ["all-about-alan-topic/not-needing-the-thing-at-all"],
  related: ["all-about-alan-topic/my-information-diet"],
  settled:
    "Most of my ways out need something built, learned or bought. Panels on the roof. A machine in the house. A garden. A skill.\n\nStopping consuming needs none of that. Nothing to build, nothing to learn, no capital to commit. Just stop.\n\nSo it is the cheapest instance of the move I have, and the one that takes the least to begin.",
} as const satisfies AllAboutAlanTopic
