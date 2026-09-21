import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const thePriceOfGettingClear = {
  id: "01a0c5a8-b0de-7544-bd0d-880418d5aacf",
  type: "page-type/all-about-alan-topic",
  slug: "the-price-of-getting-clear",
  title: "The Price Of Getting Clear",
  definition: "why resolving an uncertainty can leave me sadder than carrying it did",
  parents: ["all-about-alan-topic/how-i-know-things"],
  related: [
    "all-about-alan-topic/what-i-think-truth-is",
    "all-about-alan-topic/what-recovery-did-not-give-her",
  ],
  settled:
    "A conversation that clears something up can leave me sadder, and the mechanism is clean.\n\nClarity turns a wide uncertainty into high confidence about a spread whose middle is lower than the uncertain version implied.\n\nThe uncertainty was itself a comfort, because it kept a better outcome in play. Buying the clarity spends that comfort.\n\nIt runs on both sides of a hard conversation. The other person gets a clearer view of their own pain point at the price of the hope the ambiguity was holding open.\n\nI still want it. The same pull toward what is true runs everything else I do. But it is paid for in comfort rather than free.",
} as const satisfies AllAboutAlanTopic
