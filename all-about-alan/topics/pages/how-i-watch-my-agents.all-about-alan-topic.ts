import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howIWatchMyAgents = {
  id: "01a06559-9d65-7487-b499-ae7beba85dcc",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-i-watch-my-agents",
  title: "How I Watch My Agents",
  definition: "how I keep eight to twelve going at once and notice which one wants me",
  parentSlugs: ["how-my-attention-works"],
  relatedSlugs: ["how-stimulated-i-am"],
  settled:
    "Motion pulls my eye, and then I notice the still window next to it.\n\nBoredom is what moves me between them, and a free slot turns it into another project.\n\nTwelve is how many windows stay legible on half my screen, and that is the whole ceiling.\n\nWork that does not need to talk to me goes below the glass and reaches me through a manager.",
  unsettled:
    "Whether boredom ever starts a team I cannot keep up with, a slot free but my attention already full, is unprobed.\n\nWhere music sits in this is unclear. It may be only a knob on how wound up I am, or it may set which gear I scan in.\n\nAnd whether another game would serve as the filler, or the loading screens make this one right, is open.\n\nEight to twelve streams, a game and music run together without interfering. Whether they draw on different resources or share one is unsettled.",
} as const satisfies AllAboutAlanTopic
