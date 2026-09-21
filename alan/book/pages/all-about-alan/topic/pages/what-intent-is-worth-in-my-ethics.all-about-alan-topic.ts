import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatIntentIsWorthInMyEthics = {
  id: "01a0c5a3-f3fa-7cbf-800c-153dfa797102",
  type: "page-type/all-about-alan-topic",
  slug: "what-intent-is-worth-in-my-ethics",
  title: "What Intent Is Worth In My Ethics",
  definition: "intent carrying no weight of its own, entering only as a forecast",
  parents: ["all-about-alan-topic/the-ethics-i-worked-out"],
  related: ["all-about-alan-topic/where-doing-and-failing-to-do-differ"],
  settled:
    "Intent carries no independent moral weight. It enters only as a predictor of what an agent's future actions are worth.\n\nA bad outcome from good intent is uncertainty, a fair gamble lost, and carries no culpability.\n\nA good outcome from bad intent stays scored good. What the bad intent costs is separate: persistent bad intent prices as negative expected value in everyone else's forward fan.\n\nBad intent that is never realised and never moves anyone's expected value scores neutral. That is the bullet a consequentialist has to take, and I take it.",
} as const satisfies AllAboutAlanTopic
