import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theSleepAndSexTrade = {
  id: "01a0c58f-8ace-7dfe-95ae-f9e08e5b2cf9",
  type: "page-type/all-about-alan-topic",
  slug: "the-sleep-and-sex-trade",
  title: "The Sleep And Sex Trade",
  definition: "what chasing sleep cost the sexual side of my marriage, and the fix I cannot afford",
  parents: ["all-about-alan-topic/sharing-a-bed", "all-about-alan-topic/sex"],
  related: ["all-about-alan-topic/sleep", "all-about-alan-topic/living-with-jen"],
  settled:
    "Moving out of the shared bedroom bought me the sleep and closed most of the windows where sex gets started. Our frequency fell to about once a quarter.\n\nThe bind is that one move does both. The sleep funds the safety that would make connection affordable, and the same move took away the chance to have it.\n\nThe fix I have queued is cuddling at the changeover into the night. I cannot afford it yet, because the conversation to set it up is a level five difficulty with no discount on it.",
} as const satisfies AllAboutAlanTopic
