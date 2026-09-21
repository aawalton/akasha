import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyAFoodStopsWorking = {
  id: "01a0c59f-93f0-7628-ad03-fe7056151977",
  type: "page-type/all-about-alan-topic",
  slug: "why-a-food-stops-working",
  title: "Why A Food Stops Working",
  definition: "the two ways a food leaves my set, and what each one has already killed",
  parents: ["all-about-alan-topic/how-i-eat"],
  related: [
    "all-about-alan-topic/how-a-good-thing-quietly-stops",
    "all-about-alan-topic/building-my-wants-into-the-room",
  ],
  settled:
    "A food leaves two ways, and I manage against both.\n\nA few bad units write a lasting aversion. That killed my pre-peeled boiled eggs, over eggshells and the occasional rotten one, and my grapefruit cups, over bitterness and the occasional rancid one.\n\nWhat survives survives because it is extremely consistent by design. Consistency is something I select on rather than a bonus.\n\nThe other way is that a perfectly good food drops out of my awareness and quietly stops being eaten. The Orgain smoothie went that way. That is the live threat to what is working now: not that it stops working, but that it stops being seen.\n\nSo keeping a food where I can see it is what keeps it in my diet.",
} as const satisfies AllAboutAlanTopic
