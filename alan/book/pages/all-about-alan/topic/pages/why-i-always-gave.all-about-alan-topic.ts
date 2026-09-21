import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyIAlwaysGave = {
  id: "01a0c598-7ea3-7a26-aa9b-8492a7b5f6d9",
  type: "page-type/all-about-alan-topic",
  slug: "why-i-always-gave",
  title: "Why I Always Gave",
  definition: "the comparison that decided whether to give, and why it could only come out one way",
  parents: ["all-about-alan-topic/blank-check-mode-and-recovery-mode"],
  related: [
    "all-about-alan-topic/working-out-how-she-thinks",
    "all-about-alan-topic/the-rule-that-i-may-not-spend-myself",
  ],
  settled:
    "A need and a want are not different in kind to me. They differ only in how much of a life they move.\n\nSo whether to give is a comparison of magnitudes: what it moves in them against what it costs in me.\n\nBoth sides were broken. I cannot estimate what anything is worth inside another person, so their side was an unknown.\n\nMy own side entered as zero, because the belief I grew up with was that my needs were not important and could only be met once everyone else's had been.\n\nAn unknown against a forced zero always comes out give. The belief did not merely tilt the comparison. Together with what I cannot pre-play it removed every input that could have said no.\n\nThe repair was putting my own side back on the scale: my needs are as important as anyone's.",
} as const satisfies AllAboutAlanTopic
