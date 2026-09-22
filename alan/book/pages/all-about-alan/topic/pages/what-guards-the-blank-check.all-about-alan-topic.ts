import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatGuardsTheBlankCheck = {
  id: "01a0c59c-e0d3-7c0c-800d-c95b7fb3c160",
  type: "page-type/all-about-alan-topic",
  slug: "what-guards-the-blank-check",
  title: "What Guards The Blank Check",
  definition: "what stops the nightly blank check, given I cannot stop it myself",
  parents: ["all-about-alan-topic/blank-check-mode-and-recovery-mode"],
  related: [
    "all-about-alan-topic/showing-jen-where-i-am",
    "all-about-alan-topic/the-rule-that-i-may-not-spend-myself",
  ],
  settled:
    "I cannot hold a guardrail inside me and write a blank check at the same time. The two are incompatible, so the guard has to sit outside me.\n\nIt has to be Jen, because she is the only other person present where this runs. And she has to be the one who starts it, because by the time I am near the line I have lost the ability to start anything.\n\nThe trigger is below safety zero, where I can no longer hide the misery, and she notices and renegotiates.\n\nThe harm is granted rather than disputed. Relationships require sacrifice, and I have taken that as a rule.\n\nWhat makes it bearable is that it recovers. The nightly one lands somewhere between breaking even and recovered by the next night; the multi-day kind belongs to date nights instead.\n\nA low reading during the day is the check being paid, not the check overrunning.\n\nWe have since stopped making the night a blank check, so this describes what guarded it while it ran.",
} as const satisfies AllAboutAlanTopic
