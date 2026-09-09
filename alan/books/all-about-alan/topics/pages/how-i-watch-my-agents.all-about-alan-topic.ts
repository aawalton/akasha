import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howIWatchMyAgents = {
  id: "01a06559-9d65-7487-b499-ae7beba85dcc",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "how-i-watch-my-agents",
  title: "How I Watch My Agents",
  definition: "how I keep eight to twelve going at once and notice which one wants me",
  parents: ["how-my-attention-works"],
  related: ["how-stimulated-i-am"],
  settled:
    "Motion pulls my eye, and then I notice the still window next to it.\n\nBoredom is what moves me between them, and a free slot turns it into another project.\n\nTwelve is how many windows stay legible on half my screen, and that is the whole ceiling.\n\nWork that does not need to talk to me goes below the glass and reaches me through a manager.",
} as const satisfies AllAboutAlanTopic
