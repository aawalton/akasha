import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatANightOfSleepDeposits = {
  id: "01a0c590-162d-7ca2-a09d-7aa041a860f9",
  type: "page-type/all-about-alan-topic",
  slug: "what-a-night-of-sleep-deposits",
  title: "What A Night Of Sleep Deposits",
  definition: "the capacity a night pays back, and where that leaves me in the morning",
  parents: ["all-about-alan-topic/health-bar"],
  related: ["all-about-alan-topic/sleep", "all-about-alan-topic/the-surplus-i-try-to-stay-above"],
  settled:
    "Sleep pays back an hour of capacity for every hour slept. Six hours slept is six capacity hours, ten hours slept is ten.\n\nSo a morning opens somewhere in level two or three. Six hours lands inside level two, ten hours lands at the top of level three.\n\nSlow breathing through the morning carries the surplus past twelve capacity hours, which is where the recovery arithmetic runs at its target.\n\nThe nine or ten I want was never chosen by experiment. I slept as much as I could and that is where it landed. There is no deficit I am closing against a target, and every extra hour is noticeable at the margin.",
} as const satisfies AllAboutAlanTopic
