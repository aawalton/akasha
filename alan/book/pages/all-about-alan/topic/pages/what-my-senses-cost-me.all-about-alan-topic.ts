import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatMySensesCostMe = {
  id: "01a06559-9d65-700d-bc9b-2f84095854c3",
  type: "page-type/all-about-alan-topic",
  slug: "what-my-senses-cost-me",
  title: "What My Senses Cost Me",
  definition: "what sound, light and touch take out of me",
  parents: ["all-about-alan-topic/safety-bar"],
  related: ["all-about-alan-topic/how-much-attention-i-have"],
  settled:
    "It moves with how safe I feel rather than staying fixed. The same input costs me less capacity at a higher safety level, because tolerance scales with the level.\n\nBefore the AirPods, ambient sound with no ear protection was about half my total daily nervous-system cost. That no longer holds on the same input. Part of the drop is the tool. Most of it is that safety has recovered enough for the ambient load to land on a more tolerant nervous system.\n\nThe same almost certainly applies to ambient light, but I never instrumented the visual side the way I did the auditory, so that one is inferred rather than measured.\n\nTouch follows the pattern too, and its trigger reads as mana rather than safety. I wear tight clothing by default and the break to loose fires on low-mana days. So the route from resource state to sensory tolerance is wider than safety alone.\n\nBetter tools and a higher resource state multiply rather than add. The same tools give more headroom as I recover and less as I drop.",
} as const satisfies AllAboutAlanTopic
