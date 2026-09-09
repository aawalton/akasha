import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theScaffoldingIBuilt = {
  id: "01a06559-9d65-7ec9-b3bf-87a17dee0c36",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-scaffolding-i-built",
  title: "The Scaffolding I Built",
  definition: "the twenty years of structure I run on, holding what my head cannot",
  parents: ["alan"],
  related: [
    "how-i-get-anything-done",
    "how-i-remember-anything",
    "how-i-watch-my-agents",
    "playing-the-long-game",
  ],
  settled:
    "I am the agent and the system around me is the harness. Every tool in it is a part, not the thing.\n\nIt grows by adding rather than replacing, and a layer gets built when something buckles.\n\nTwenty years produced two permanent organs, one on what I can track and one on what I can carry.\n\nThe two are wired together: clearing the queues lifts my safety, and low safety piles them up and drags it lower.\n\nThe task half lives in software now, a set of streams I push things out of my head into.",
} as const satisfies AllAboutAlanTopic
