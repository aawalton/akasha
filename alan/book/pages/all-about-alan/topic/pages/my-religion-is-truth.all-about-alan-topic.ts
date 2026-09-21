import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const myReligionIsTruth = {
  id: "01a0c592-1087-7804-aeba-dccb774290bd",
  type: "page-type/all-about-alan-topic",
  slug: "my-religion-is-truth",
  title: "My Religion Is Truth",
  definition: "truth as my highest allegiance, claimable from any source there is",
  parents: ["all-about-alan-topic/what-i-think-truth-is"],
  related: ["all-about-alan-topic/my-faith", "all-about-alan-topic/what-i-take-in"],
  settled:
    "My religion is truth, and if there is any truth in heaven, earth, or hell, it belongs to me.\n\nThe allegiance is to truth itself rather than to truth as a way of getting something else.\n\nNo source is excluded and no subject is off limits. Truth found in hell is still truth, and still mine.\n\nPerception and compression are my best current understanding of how to move in that direction. Taking in widely keeps the set honest, and compactness is what picks the model.\n\nThe word current is doing work there. The method is a draft like everything else, and swapping coherence for compactness is the proof that even the load-bearing pieces move.",
} as const satisfies AllAboutAlanTopic
