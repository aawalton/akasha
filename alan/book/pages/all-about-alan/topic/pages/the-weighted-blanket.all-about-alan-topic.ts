import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theWeightedBlanket = {
  id: "01a06559-9d65-762e-b11c-095ca1fe26eb",
  type: "page-type/all-about-alan-topic",
  slug: "the-weighted-blanket",
  title: "The Weighted Blanket",
  definition: "the blanket I put on when a night is going badly",
  parents: ["all-about-alan-topic/sleep"],
  settled:
    "Off by default. I reach for it on a bad night rather than keeping it on the bed, and not on every bad night, only when my body reads as wanting pressure.\n\nWhen I do reach for it, it helps about half the time. It is the least reliable tool in my sensory kit.\n\nSome nights it goes on the legs only, some nights the whole body, by what the night asks for, and I often swap between the two partway through.\n\nComfortable on the legs, where on the chest it blocks my breathing. Legs do not carry the breathing and the chest does, which is the whole difference.\n\nIt works by stilling me and drawing heat off, so it helps when I am too hot rather than when I am cold. Grounding is not what it does. My tight clothes ground me. The blanket is a different tool in the same modality, so the two do not stack as more of the same thing.\n\nOver-weighting usually costs more than it gives, and going without costs almost nothing, which is why off is the right default.",
} as const satisfies AllAboutAlanTopic
