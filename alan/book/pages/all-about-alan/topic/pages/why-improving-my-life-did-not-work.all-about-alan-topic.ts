import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyImprovingMyLifeDidNotWork = {
  id: "01a0c593-934b-7fd7-b974-580e3b9e3397",
  type: "page-type/all-about-alan-topic",
  slug: "why-improving-my-life-did-not-work",
  title: "Why Improving My Life Did Not Work",
  definition: "the purpose I ran on before, and the dissonance it kept making",
  parents: ["all-about-alan-topic/self-improvement"],
  related: [
    "all-about-alan-topic/calling-something-weather",
    "all-about-alan-topic/where-connection-could-come-from",
  ],
  settled:
    "For months my purpose was improving my life, and it never worked as one. It was implicit rather than a bridge I had built, so it made no pull. I was only trying to be less miserable, and could muster no desire to act even then.\n\nImproving my life means making it more pleasant, and that depends enormously on things outside my control. It made a constant source of dissonance.\n\nImproving myself is entirely within my control, to the extent it is possible at all. Moving the purpose itself inside the circle of control takes the dissonance away at its source rather than managing it.\n\nThe test of a purpose is whether it makes motion. This one built momentum again and got me out of flop, which is the test improving my life kept failing.",
} as const satisfies AllAboutAlanTopic
