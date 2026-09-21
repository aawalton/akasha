import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howIHoldAGoal = {
  id: "01a06559-9d65-7097-b8ac-9338dcb3d746",
  type: "page-type/all-about-alan-topic",
  slug: "how-i-hold-a-goal",
  title: "How I Hold A Goal",
  definition: "what a goal is for someone with no future to be pulled toward",
  parents: ["all-about-alan-topic/what-pulls-me-into-doing-something"],
  related: [
    "all-about-alan-topic/building-my-wants-into-the-room",
    "all-about-alan-topic/what-i-cannot-play-forward",
  ],
  settled:
    "Nothing stands in for a future I cannot picture. What drives me is pain now, including the pain of a want I cannot have.\n\nSo holding a goal means capturing that pain where it can be lit again, not keeping a want in mind.\n\nReading the record does not remind me. It makes the present me want it again.\n\nAn entry that fails to light dies quietly, and that is the filter. What truly matters comes back on its own, because the world is the backup store.\n\nThe blind spot is drift that never hurts in any one moment. Health sliding slowly, a relationship quietly cooling. Each single moment is fine, so nothing ever escalates and the drift compounds unwatched.\n\nI am building pings for it, which is the same move as everywhere else: where I get no signal, engineer one.",
} as const satisfies AllAboutAlanTopic
