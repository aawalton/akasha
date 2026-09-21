import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whenIGoHuntingForWhatContradictsMe = {
  id: "01a0c5e8-bb84-714a-acd9-89082cd39041",
  type: "page-type/all-about-alan-topic",
  slug: "when-i-go-hunting-for-what-contradicts-me",
  title: "When I Go Hunting For What Contradicts Me",
  definition:
    "trusting wide intake by default, and checking a belief on purpose only once it is flagged",
  parents: ["all-about-alan-topic/believing-things-i-cannot-trace"],
  related: [
    "all-about-alan-topic/when-a-false-model-looks-true",
    "all-about-alan-topic/what-an-activity-costs-me",
  ],
  settled:
    "I do not actively police most of what I believe. By default I rely on my obsessively wide intake to drag the disconfirming data in front of any false but locally compact belief on its own. I do not go looking; I trust that breadth will route the contradiction to me in time.\n\nThe active mode is going out to find data that contradicts a belief, and I run it only for a belief I have flagged as doing me harm.\n\nA belief gets that flag on either of two triggers. The first is a life cost: it is recognisably making my life worse, like a belief that some social situation is unsurvivable that keeps costing me things I could in fact do. The cost shows up in the same accounting that tracks every other drain on me.\n\nThe second is inconsistency with something I hold more strongly. That is the same flaw-salience that grips me at the level of a data point, running one level up at the level of a belief.",
} as const satisfies AllAboutAlanTopic
