import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyATrueModelIsSmaller = {
  id: "01a0c5a6-d49f-78ff-b99f-00d41a5beac4",
  type: "page-type/all-about-alan-topic",
  slug: "why-a-true-model-is-smaller",
  title: "Why A True Model Is Smaller",
  definition: "truth as net compression of my conceptual map, counted over model and data together",
  parents: ["all-about-alan-topic/how-i-know-things"],
  related: ["all-about-alan-topic/what-i-think-truth-is"],
  settled:
    "Truth is more compressed than falsehood in conceptual space. The same observations organised rightly take a smaller, cleaner representation than the same observations organised wrongly.\n\nFalsehood costs structure. Extra clauses, special cases, exceptions bolted on to keep the model alive.\n\nFor me truth and compression are the same thing. For a model to be true it has to be a net compression of my conceptual map, counting both the model itself and the data it can explain.\n\nI do not pay for a model with its own size. I pay for it with everything it lets me stop storing separately. A model earns its keep by deleting more than it adds.\n\nSo elegant just means nets out as a compression, and ugly means a model that costs more than it saves. A model that is true but costs more than it pays back does not light up either.",
} as const satisfies AllAboutAlanTopic
