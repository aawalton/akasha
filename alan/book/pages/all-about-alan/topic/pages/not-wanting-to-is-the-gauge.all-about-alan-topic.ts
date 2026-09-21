import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const notWantingToIsTheGauge = {
  id: "01a06559-9d65-73c5-9c38-c2134c5f2d54",
  type: "page-type/all-about-alan-topic",
  slug: "not-wanting-to-is-the-gauge",
  title: "Not Wanting To Is The Gauge",
  definition: "the one signal my body gives me when a resource is running out",
  parents: ["all-about-alan-topic/resources"],
  related: ["all-about-alan-topic/rules-instead-of-a-brake"],
  settled:
    "It is not wanting to, and it says a bar is low without saying which one.\n\nMy four bars do not surface as four readings. They all come through as this one signal.\n\nSo I work out which bar it is afterwards, by matching what I feel now against each bar's signature. Jitteriness from cortisol is health. A drop in what I can start that is global rather than about the one task in front of me is mana. Plain fatigue is stamina. For safety I walk down the activity tiers until one holds.\n\nThat reading is what feeds the rule about not doing what I cannot afford.",
} as const satisfies AllAboutAlanTopic
